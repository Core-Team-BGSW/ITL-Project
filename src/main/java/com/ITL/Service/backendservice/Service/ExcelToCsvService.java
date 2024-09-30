package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Controller.CsvToDatabaseController;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExcelToCsvService {
    @Value("${csv.file.directory}")
    private String csvFileDirectory;
    private final CsvToDatabaseController csvToDatabaseController;
    private final FileService fileService;

    public ResponseEntity<String> excelToCsvConverter(MultipartFile file) {
        Path path = Paths.get(csvFileDirectory);
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("uploaded file is empty");
        }
        try {
            Workbook workbook;
            String fileType = FilenameUtils.getExtension(file.getOriginalFilename());
            assert fileType != null;
            if (fileType.equals("xlsx")) {
                workbook = new XSSFWorkbook(file.getInputStream());
            } else if (fileType.equals("xls")) {
                workbook = new HSSFWorkbook(file.getInputStream());
            } else {
                file.getInputStream().close();
                throw new IOException("File Not Found");
            }

            Sheet sheet = workbook.getSheetAt(0);
            String csvFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()).replace(".xlsx", ".csv"));
            String fileUniqueId = UUID.randomUUID().toString();
            csvFileName+=fileUniqueId;
            System.out.println(csvFileName);
            File csvFile = new File(csvFileDirectory + File.separator + csvFileName);
            PrintWriter csvWriter = new PrintWriter(new FileWriter(csvFile));
            getCSV(sheet,csvWriter);
            workbook.close();
            csvToDatabaseController.uploadCsvToDatabase(path + "\\" + csvFileName);
            Path deletePath = Paths.get(path + "\\" + csvFileName);
            fileService.deleteCsvFile(deletePath);
            return ResponseEntity.ok("Converted Excel file to CSV and stored at: " + csvFile.getAbsolutePath());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error converting Excel to CSV: " + e.getMessage());
        }
    }

    private void getCSV(Sheet sheet, PrintWriter csvWriter)
    {
        for (Row row : sheet) {
            if(isRowEmpty(row)) continue;
            int columnCount = row.getLastCellNum();
            String[] csvData = new String[columnCount];
            for (int i = 0; i < columnCount; i++) {
                Cell cell = row.getCell(i);
                if(cell!=null) {
                    if(cell.getCellType() == CellType.BLANK)
                    {
                       continue;
                    }
                    csvData[i] = getCellValueAsString(cell);
                }
            }
            String joinedCsvData = "";
            if(csvData.length!=0) {
                 joinedCsvData = String.join(",", csvData);
            }
            if(!joinedCsvData.isEmpty()) {
                csvWriter.print(joinedCsvData);
                csvWriter.println();
            }
        }
        csvWriter.close();
    }

    private static boolean isRowEmpty(Row row) {
        for (Cell cell : row) {
            if (cell.getCellType() != CellType.BLANK) {
                return false;
            }
        }
        return true;
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case BOOLEAN -> {
                return (cell.getBooleanCellValue()+"");
            }
            case STRING -> {
                return (cell.getStringCellValue());
            }
            case NUMERIC -> {
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else return String.valueOf(cell.getNumericCellValue());
            }
            default -> {
                return ("");
            }
        }
    }
}

package com.ITL.Service.backendservice.Utility;

import com.ITL.Service.backendservice.Model.LabFormData;
import com.ITL.Service.backendservice.Service.SendEmailWithFile;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelConverter {
    @Lazy
    private final SendEmailWithFile sendEmailWithFile;
    public void createExcelFileFromLabData(LabFormData labFormData) throws IOException, MessagingException {
        // Create a new workbook
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Lab Data");

        // Create the header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Region");
        headerRow.createCell(1).setCellValue("Country");
        headerRow.createCell(2).setCellValue("Location Code");
        headerRow.createCell(3).setCellValue("GB");
        headerRow.createCell(4).setCellValue("Local ITL");
        headerRow.createCell(5).setCellValue("Entity Name");
        headerRow.createCell(6).setCellValue("Local ITL Proxy");
        headerRow.createCell(7).setCellValue("DH");
        headerRow.createCell(8).setCellValue("KAM");
        headerRow.createCell(9).setCellValue("Department Name");
        headerRow.createCell(10).setCellValue("Building");
        headerRow.createCell(11).setCellValue("Floor");
        headerRow.createCell(12).setCellValue("Lab No");
        headerRow.createCell(13).setCellValue("Primary Lab Coordinator");
        headerRow.createCell(14).setCellValue("Secondary Lab Coordinator");
        headerRow.createCell(15).setCellValue("Cost Center");
        headerRow.createCell(16).setCellValue("Kind Of LAB");
        headerRow.createCell(17).setCellValue("Purpose of Lab");
        headerRow.createCell(18).setCellValue("Description");
        headerRow.createCell(19).setCellValue("New Equipment");
        headerRow.createCell(20).setCellValue("Shared Lab");
        headerRow.createCell(21).setCellValue("ACL Required");
        headerRow.createCell(22).setCellValue("Green Ports");
        headerRow.createCell(23).setCellValue("Yellow Ports");
        headerRow.createCell(24).setCellValue("Red Ports");
        headerRow.createCell(25).setCellValue("Self Audit Date");

        // Fill data

        Row row = sheet.createRow(1);
        row.createCell(0).setCellValue(labFormData.getRegion());
        row.createCell(1).setCellValue(labFormData.getCountry());
        row.createCell(2).setCellValue(labFormData.getLocationCode());
        row.createCell(3).setCellValue(labFormData.getGb());
        row.createCell(4).setCellValue(labFormData.getLocal_itl());
        row.createCell(5).setCellValue(labFormData.getEntityName());
        row.createCell(6).setCellValue(labFormData.getLocal_itl_proxy());
        row.createCell(7).setCellValue(labFormData.getDh());
        row.createCell(8).setCellValue(labFormData.getDh());
        row.createCell(9).setCellValue(labFormData.getDep_name());
        row.createCell(10).setCellValue(labFormData.getBuilding());
        row.createCell(11).setCellValue(labFormData.getFloor());
        row.createCell(12).setCellValue(labFormData.getLabNo());
        row.createCell(13).setCellValue(labFormData.getPrimary_lab_cord());
        row.createCell(14).setCellValue(labFormData.getSecondary_lab_cord());
        row.createCell(15).setCellValue(labFormData.getCost_center());
        row.createCell(16).setCellValue(labFormData.getKind_of_lab());
        row.createCell(17).setCellValue(labFormData.getPurpose_of_lab());
        row.createCell(18).setCellValue(labFormData.getDescription());
        row.createCell(19).setCellValue(labFormData.getNew_equipment());
        row.createCell(20).setCellValue(labFormData.getShared_lab());
        row.createCell(21).setCellValue(labFormData.getAcl_req());
        row.createCell(22).setCellValue(labFormData.getGreen_ports());
        row.createCell(23).setCellValue(labFormData.getYellow_ports());
        row.createCell(24).setCellValue(labFormData.getRed_ports());
        row.createCell(25).setCellValue(labFormData.getSelf_audit_date());


        // Create a temporary file to write to
        File file = new File("labData.xlsx");
        try (FileOutputStream fileOut = new FileOutputStream(file)) {
            workbook.write(fileOut);
        }
        // Return the created file
        sendEmailWithFile.emailWithFile(file,labFormData.getLocal_itl(),labFormData.getDh(),labFormData.getKam());
    }
    @Async
    public void sendEmailToAllUsers(List<LabFormData> labFormDataList) throws MessagingException, IOException {
        for(LabFormData labFormData : labFormDataList)
        {
            createExcelFileFromLabData(labFormData);
        }
    }
}

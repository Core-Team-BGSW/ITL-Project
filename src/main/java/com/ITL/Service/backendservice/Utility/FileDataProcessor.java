package com.ITL.Service.backendservice.Utility;

import com.ITL.Service.backendservice.Model.FileData;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
public class FileDataProcessor implements ItemProcessor<FileData, FileData> {
    @Override
    public FileData process(FileData fileData) throws Exception {
        return fileData;
    }
}

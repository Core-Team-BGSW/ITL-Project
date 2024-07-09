package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Controller.CsvToDatabaseController;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.Scheduled;

import java.io.IOException;
import java.nio.file.*;

@RequiredArgsConstructor
public class CsvFileMonitorService {
    private final TaskExecutor taskExecutor;
    private final CsvToDatabaseController csvToDatabaseController;
    @Value("${csv.file.directory}")
    private String csvFileDirectory;

    @Scheduled(cron = "0 0 */12 * * *")
    public void monitorCsvDirectory() {
        taskExecutor.execute(() -> {
            try {
                WatchService watchService = FileSystems.getDefault().newWatchService();
                Path path = Paths.get(csvFileDirectory);
                path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE, StandardWatchEventKinds.ENTRY_MODIFY);
                while(true) {
                    WatchKey key;
                    try {
                        key = watchService.take();
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    for(WatchEvent<?> event : key.pollEvents())
                    {
                        WatchEvent.Kind<?> kind = event.kind();
                        if(kind == StandardWatchEventKinds.OVERFLOW) continue;
                        @SuppressWarnings("unchecked")
                        WatchEvent<Path> ev = (WatchEvent<Path>) event;
                        Path filename = ev.context();
                        if(filename.toString().endsWith(".csv"))
                        {
                            String response = csvToDatabaseController.uploadCsvToDatabase(csvFileDirectory);
                            System.out.println(response);
                        }
                    }
                    boolean valid = key.reset();
                    if(!valid) break;
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }
}

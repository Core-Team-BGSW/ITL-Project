package com.ITL.Service.backendservice.Controller;


import com.ITL.Service.backendservice.Model.LocationData;
import com.ITL.Service.backendservice.Service.LocationDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/boschLabsLocation")
@RestController
public class LocationDataController {
    private final LocationDataService locationDataService;

    @PostMapping("/uploadcsv")
    public String uploadLocationData(@RequestParam("file") MultipartFile file)
    {
        try {
            locationDataService.readCsvAndSaveToMongoDB(file);
            return "Data successfully saved to MongoDB";
        }
        catch(IOException e)
        {
            return "Error processing Csv file: " + e.getMessage();
        }
    }

    @GetMapping("/location/api")
    public List<LocationData> locationData()
    {
        return locationDataService.locationData();
    }
}

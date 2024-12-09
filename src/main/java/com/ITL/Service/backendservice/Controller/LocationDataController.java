package com.ITL.Service.backendservice.Controller;


import com.ITL.Service.backendservice.Model.LocationData;
import com.ITL.Service.backendservice.Service.LocationDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> uploadLocationData(@RequestParam("file") MultipartFile file)
    {
        try {
            locationDataService.readCsvAndSaveToMongoDB(file);
            return ResponseEntity.ok("The location Data is Successfully stored in the database");
        }
        catch(IOException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("While saving the location data error occurred" +  e.getMessage());
        }
    }

    @GetMapping("/location/api")
    public List<LocationData> locationData()
    {
        return locationDataService.locationData();
    }
}

package com.ITL.Service.backendservice.Service;

import com.ITL.Service.backendservice.Model.Entity;
import com.ITL.Service.backendservice.Model.LabData;
import com.ITL.Service.backendservice.Model.User;
import com.ITL.Service.backendservice.Repository.EntityRepo;
import com.ITL.Service.backendservice.Repository.LabDataRepo;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserDetailsUpdateService {

    private final RestTemplate restTemplate;
    private final LabDataRepo labDataRepo;
    private final EntityRepo entityRepo;

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsUpdateService.class);

   private User fetchUserDetails(String userId)
   {
       try {
           String apiUrl = "http://localhost:8080/userinfo/" + userId;
           return restTemplate.getForObject(apiUrl, User.class);
       }
       catch (Exception e) {
           logger.error("Error fetching user Details for userID from Bosch User API");
           e.printStackTrace();
           return null; // Handle gracefully
       }
   }

   @Scheduled(cron = "0 0 0 1/10 * *")
   public void updateDatabase() {
       List<LabData> allLabData = labDataRepo.findAll();
       Set<String> processedUserId = new HashSet<>();
       for(LabData labData : allLabData)
       {
           String userId = null;
           if(Objects.equals(labData.getPrimary_lab_cord(), "null") &&
                   Objects.equals(labData.getLocal_itl(), "null") &&
                   Objects.equals(labData.getLocal_itl_proxy(), "null"))
               continue;

           if(!labData.getPrimary_lab_cord().equals("null"))
               userId = labData.getPrimary_lab_cord();

           else if(!Objects.equals(labData.getLocal_itl(), "null"))
               userId = labData.getLocal_itl();

           else if(!Objects.equals(labData.getLocal_itl_proxy(), "null"))
               userId = labData.getLocal_itl_proxy();

           if (userId !=null && !processedUserId.contains(userId)) { // Check if already processed
               User user = fetchUserDetails(userId);
               if (user != null) {
                   updateLabData(user);
                   processedUserId.add(userId); // Mark user ID as processed
               }
           }
       }
   }

    private void updateLabData(User userDetails) {
        List<LabData> labDataList = null;
        if(labDataRepo.findByPrimary_lab_cord(userDetails.getUserId())!=null)
          labDataList = labDataRepo.findByPrimary_lab_cord(userDetails.getUserId());
        else if(labDataRepo.findByLocal_itl(userDetails.getUserId())!=null)
            labDataList = labDataRepo.findByLocal_itl(userDetails.getUserId());
        else if(labDataRepo.findByLocal_itl_proxy(userDetails.getUserId())!=null)
            labDataList = labDataRepo.findByLocal_itl_proxy(userDetails.getUserId());

        if(labDataList == null) logger.info("LabDataList is null for userDetails!");

        assert labDataList != null;
        for(LabData labData : labDataList)
        {
            labData.setDep_name(userDetails.getDepartment());
            labData.setCost_center(userDetails.getCostCenter());
            labData.setDh(userDetails.getDepartmentHead());
            labData.setLocationCode(userDetails.getLocation());
            labDataRepo.save(labData);
            List<Entity> entityList;
            if(!Objects.equals(labData.getEntityName(), userDetails.getEntity()))
            {
                labData.setEntityName(userDetails.getEntity());
                boolean locationUpdated = !Objects.equals(labData.getLocationCode(), userDetails.getLocation());
                entityList = entityRepo.findAllByEntityName(userDetails.getEntity());
                for(Entity entity : entityList)
                {
                    if(locationUpdated) entity.setLocationCode(userDetails.getLocation());
                    entity.setEntityName(userDetails.getEntity());
                    entityRepo.save(entity);
                }
            }
        }
    }
}

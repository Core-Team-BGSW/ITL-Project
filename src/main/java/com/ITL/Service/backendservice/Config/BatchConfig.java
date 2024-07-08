package com.ITL.Service.backendservice.Config;

import com.ITL.Service.backendservice.Model.FileData;
import com.ITL.Service.backendservice.Utility.FileDataProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.data.MongoItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@EnableBatchProcessing
public class BatchConfig {

    private final MongoTemplate mongoTemplate;
    private final JobRepository jobRepository;
    private final PlatformTransactionManager platformTransactionManager;


    @Bean
    public FlatFileItemReader<FileData> itemReader() {
        FlatFileItemReader<FileData> itemReader = new FlatFileItemReader<>();
        itemReader.setResource(new FileSystemResource("/Users/coder/Downloads/backendservice/src/main/resources/static")); // change the path according to your system wherever you store the csv file
        itemReader.setName("csvReader");
        itemReader.setLinesToSkip(0);
        itemReader.setLineMapper(lineMapper());
        return itemReader;
    }

    @Bean
    public FileDataProcessor processor() {
        return new FileDataProcessor();
    }

    @Bean
    public MongoItemWriter<FileData> writer() {
        MongoItemWriter<FileData> writer = new MongoItemWriter<>();
        writer.setTemplate(mongoTemplate);
        writer.setCollection("file_data");
        return writer;
    }

    @Bean
    public TaskExecutor taskExecutor() {
        SimpleAsyncTaskExecutor asyncTaskExecutor = new SimpleAsyncTaskExecutor();
        asyncTaskExecutor.setConcurrencyLimit(10);
        return asyncTaskExecutor;
    }

    @Bean
    public Step importStep() {
        return new StepBuilder("csvImport",jobRepository)
                .<FileData,FileData>chunk(10,platformTransactionManager)
                .reader(itemReader())
                .processor(processor())
                .writer(writer())
                .taskExecutor(taskExecutor())
                .build();
    }

    @Bean
    public Job runJob() {
        return new JobBuilder("importFileData", jobRepository)
                .start(importStep())
                .build();
    }

    private LineMapper<FileData> lineMapper() {
        DefaultLineMapper<FileData> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("Sr_no", "Region", "Country", "Location", "Location-Code", "Entity", "GB", "Local-ITL", "Local-ITL Proxy", "DH", "KAM", "Dept Name", "Building", "Floor", "Lab No", "Cost Center", "Lab Responsible NTID (Primary)", "Lab Responsible NTID (Secondary)", "ACL Implemented(Yes/No)");
        BeanWrapperFieldSetMapper<FileData> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(FileData.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }
}


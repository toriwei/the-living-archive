# 4.1 Software Development Plan

## 4.1 Plan Introduction

This Software Development Plan provides the details of the planned development for The Living Archive, a web application that serves as an interactive archive for queer histories at Loyola Marymount University.

With this web app, users will be able to view and search the archive, view data visualizations of the archive content, submit their own archival records, and if they are an approved administrator, manage submissions. Developing these features will require integrating a data visualization API, creating a submission form connected to the existing archive database, and setting up an authentication log-in process. The web app archive is currently supported through Google Firebase, so all these new features will be integrated into the existing databases.

Tasks

| Task                              | Deadline |
| --------------------------------- | -------- |
| Responsive Design                 | Week 9   |
| Submission Form                   | Week 10  |
| Admin Portal                      | Week 11  |
| Data Visualization                | Week 11  |
| Updated Software Development Plan | Week 12  |
| Styling                           | Week 13  |
| Preliminary Demo Presentation     | Week 13  |
| Preliminary Poster                | Week 14  |
| Final Project Presentation        | Week 16  |
| Final Product Delivery            | Week 16  |
| In-Class Status Reports           | Weekly   |
| Written Status Reports            | Weekly   |

### 4.1.1 Project Deliverables

All the course and project deliverables are listed below.

#### Responsive Design

- Due: Week 9
- Description: The Living Archive will be accessible via web and mobile browsers. Styling with Tailwind CSS will enable users to easily access the website archives.

#### Submission Form

- Due: Week 10
- Description: The submission form enables users to contribute their own stories and experiences to the archive by entering their information and uploading files on the submission page. The form will be integrated through the project's existing Firebase database setup.

#### Admin Portal

- Due: Week 11
- Description: In order for the submitted records to get displayed on the archive, authorized administrators must approve them. The Admin Portal will be a new page on the website, allowing admin to log into their account and view, approve, and deny submissions. Google Firebase Authentication will be utilized for log-in purposes, and the portal will be accessing records from the Firebase database.

#### Data Visualization

- Due: Week 11
- Description: Incorporating data visualization with the D3.js API will facilitate engaging user interaction with the archive. The charts displayed will help contextualize the contents of the archive. Users will be able to customize these charts to query the archive to whatever they find most interesting. JavaScript will be used for this querying.

#### Updated Software Development Plan

- Due: Week 12
- Description: The Software Development Plan will be resubmitted to reflect any changes/updates in the project's processess.

#### Styling

- Due: Week 13
- Description: Effective user interaction is a crucial part of the project, as the archive is a content-heavy site consisting of many photos and records. Figma will be used to design the layout of the overall site as well as individual pages. Tailwind will be added to the React app to implement the designs.

#### Preliminary Demo Presentation

- Due: Week 13
- Description: The preliminary presentation will be the first version of the project presentation. It will contain a slide deck with information about the project and a live demo to showcase the development process of The Living Archive.

#### Preliminary Poster

- Due: Week 13
- Description: The preliminary poster will be the first version of the project poster. It will contain basic information about the project and how it works to quickly and effectively communicate the most important information.

#### Final Project Presentation

- Due: Week 16
- Description: Finalized presentation and demo with the information previously described in Preliminary.

#### Final Product Delivery

- Due: Week 16
- Description: The final product delivery will include the completed project, documentation, and poster.

## 4.2 Project Resources

This section details the various hardware and software resources necessary for developing this project.

### 4.2.1 Hardware Resources

Development Machine

- Device: Apple MacBook Pro
- Operating System: macOS Ventura 13.0
- Processor: 1.4 GHz Quad-Core Intel Core i5
- RAM: 16 GB

Mobile Testing Device

- Device: Apple iPhone 13
- Operating System: iOS 16.7
- Chip: A15 Bionic
- RAM: 4 GB

### 4.2.2 Software Resources

Development Environment

- Deployment: Vercel
- Testing Browser (Web): Chrome
- Testing Browser (Mobile): Safari
- Text Editor: Visual Studio Code v1.86.2

Development Tools

- Backend/Scripting: Node.js v.18.17.0
- Framework: React.js v18.2.0
- Styling: Tailwind CSS v3.3.3

Third-Party Libraries

- Axios v1.6.2
- D3.js
- Google FIrebase Authentication
- Google Firebase Cloud Storage
- Google Firebase Firestore
- Google Maps Geocoding API
- Google Maps JavaScript API

Design Tools

- User Interface Design: Figma

## 4.3 Project Organization

This section outlines the major functions and their primary tasks for The Living Archive.

### 4.3.1 Frontend

Frontend development will consist of creating the interfaces and functionality for the web app. The primary tasks include using React to create the submission and administrator pages, integrate user interaction into the data visualization charts, and make the app responsive on both web and mobile platforms.

### 4.3.2 Backend

Backend development will consist of managing the databases, designing authentication protocol, and integrating the data visualization API. Because the main archive database is already functional, the primary responsibility will be incorporating edit and delete functionality into the database.

### 4.3.3 Research

Loyola Marymount University’s Archives and Special Collections department will be consulted for this project to ensure correct permissions are requested when collecting user submissions. University archives will also be gathered from the Archives digital collections to be displayed on the web app.

## 4.4 Schedule

This section provides schedule information for The Living Archive.

### 4.4.1 GANTT Chart

![GANTT Chart](./sdp-gantt-chart.png)

### 4.4.2 Task and Resource Table

| Task                           | Resources               |
| ------------------------------ | ----------------------- |
| Create Submission Form Page    | React                   |
| Connect Form to Database       | Firebase                |
| Set Up Firebase Authentication | Firebase                |
| Create Admin Page              | React                   |
| Create Submission Management   | React, Firebase         |
| Set Up D3.js                   | D3.js                   |
| Make D3.js Customizable        | D3.js                   |
| Create UI/UX Designs           | Figma                   |
| Implement UI/UX and Styling    | Tailwind                |
| Collect Archive Submissions    | LMU Community, Archives |

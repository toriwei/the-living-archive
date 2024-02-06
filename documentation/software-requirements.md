# 5.0 Requirements Document
## Epic 1: Archive Submissions
As a user, I want to submit archival records to The Living Archive so that my stories and experiences are preserved.

**User Story 1:** As a user, I want to submit my record online through the web app so that I can conveniently contribute to the archive.

Acceptance Criteria:
- The submission page is accessible within the main web app.
- The submission page prompts users to provide information including File, Title, Description, Date, Creator/Author, Location, Contributor Name, Email, Confirm Email, and Opt-In to Display Contributor Name.
- The Files prompt includes an upload button, enabling users to upload a single file through system file chooser dialog or drag-and-drop.
- The Opt-In to Display Contributor Name has a checkbox input.
- The remaining prompts have text input boxes.

**User Story 2:** As a user, I want to receive instant feedback on my form, so I can submit the necessary information for my record.
Acceptance Criteria
- The submission form displays an error message if any required information (Files, Contributor Name, Email, Confirm Email) is not submitted.
- The submission form displays an error message if the user enters different emails in the email prompts.

## Epic 2: Administrator Workflow
As a user with administrator privileges, I want to upload archive submissions through the web app so that I do not have to do any programming on the app and databases themselves.
**User Story 3:** As a user, I want to review and approve submission records through the web app so that I can upload records to the archive.

Acceptance Criteria:
- The administrator page is accessible within the main web app.
- The administrator page requires user login with an email and password.
- The records are displayed in a grid format.
- The records can be clicked to display the submission photo and information
- The submission can be approved/denied by clicking a button.

**User Story 4:** As a user, I want to organize submission records so I can easily explore all the submissions.

Acceptance Criteria:
- The administrator page includes a "Sort By" box that sorts submissions by either ascending or descending submission date.
- The page includes a "Search" input box that accepts keywords.
- The administrator page includes a section where previous submissions can be review.

## Epic 3: Archive Data Visualization
As a user, I want to have statistics about the materials in the archive so that I can better understand the scope of the archive and its contents.

**User Story 3:** As a user, I want to see data visualizations of the records so I can easily engage with history in a way that is visually-appealing and easy to understand.

Acceptance Criteria:
- The web app displays charts with numerical information about the items depending on categories like Student Organization, Date, and Location.
- The charts are color coded.

**User Story 4:** As a user, I want to customize the data visualization so I can explore topics that are most interesting to me.

Acceptance Criteria:
- The charts have respective input boxes and search buttons for customization within categories.
- The search criteria can be removed.

## Epic 3: Performance
As a user, I want the web app to have quick performance so I can have a seamless experience in exploring and contributing to the archive. 

**User Story 5:** As a user, I want the submission page to quickly receive my information so I know that my response has been recorded.

Acceptance Criteria:
- The submission page will display a confirmation message within 5 seconds of the form being submitted.
- The submission page will display a “Still Working” message after 5 seconds if the form has not yet been entered into the database.

**User Story 6:** As a user, I want the administrator page to verify my login quickly so that I can access the submission approval page in a timely manner.

Acceptance Criteria:
- The login will be verified within 3 seconds after the user attempts to log in.
- The submissions will be displayed within 3 seconds after logging in.

**User Story 7:** As a user, I want the data visualization charts to update quickly, so that I can immediately see the changes I made to the charts.
The charts will update within 2 seconds of making customizations.

## Epic 4: Development
As a developer, I want to enhance user interactions and streamline development processes so that both end-users and developers experience an efficient web app.

**User Story 8:** As a developer, I want to ensure secure user authentication and real-time data storage, so that users can confidently submit and access archival records.

Acceptance Criteria:
- Google Firebase Authentication is implemented.
- Google Firebase Storage and Firestore are implemented.
- Users can securely log in using their credentials.
- Submitted archival records are stored in the databases for immediate access.

**User Story 9:** As a developer, I want to include a data visualization experience so that users can interact dynamically with charts and explore archive information.

Acceptance Criteria:
- D3.js is implemented.
- Dynamic and interactive charts are implemented in the web app.
- Users can customize and interact with charts to explore the archive data.

**User Story 10:** As a developer, I want to maintain uniformity with the Node version so that all developers are working with the same features.

Acceptance Criteria:
- The application is developed using Node v18.17.0.
- There are no errors with version type.

**User Story 11:** As a developer, I want to have a streamlined deployment process so that changes can be quickly pushed to production.

Acceptance Criteria:
- The application can be deployed via Vercel.
- The application can be accessed by any user with any standard web browser.


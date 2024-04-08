# 5.0 Requirements Document

This requirements document outlines the general architecture of the project to prepare for the Agile development project. The Living Archive is a web-app that serves as an interactive archive/database for queer stories and experiences at Loyola Marymount University. It includes both public features all to explore and admin-only features for approved users to help in maintaing the archive.

## Functional Requirements

### Epic 1: Archive Submissions

As a user, I want to submit archival records to The Living Archive so that my stories and experiences are preserved.

**User Story 1:** As a user, I want to submit my record online through the web app so that I can conveniently contribute to the archive.

Acceptance Criteria:

- Verify that the submission page is accessible through the main web app.
- Verify that the submission form prompts users to provide information including File, Title, Description, Date, Creator/Author, Location, Contributor Name, Email, Confirm Email, and Opt-In to Display Contributor Name.
- Verify that the Files prompt includes an upload butto that allows users to upload a single file through system file chooser dialog or drag-and-drop.
- Verify that the Opt-In to Display Contributor Name has a checkbox input.
- Verify that the remaining prompts have text input boxes.

**User Story 2:** As a user, I want to receive instant feedback on my form, so I can submit the necessary information for my record.

Acceptance Criteria

- Verify that the Files, Contributor Name, Email, Confirm Email categories are marked as required.
- Verify that the submission form displays an error message if any required information is not submitted.
- Verify that the the submission form displays an error message if the user enters different emails in the email prompts.

### Epic 2: Administrator Workflow

As a user with administrator privileges, I want to upload archive submissions through the web app so I can maintain the archive without developers or doing any programming myself.

**User Story 3:** As an administrative user, I want to review and approve submission records so that the archive can expand.

Acceptance Criteria:

- Verify that the administrator page is accessible within the main web app.
- Verify that the database can authenticate the user's email and password.
- Verify that the records are displayed in a grid format.
- Verify that the records expand to display submission photo and information when clicked.
- Verify that the administrative user can approve and deny submissions.

**User Story 4:** As a user, I want to organize and search through submission records so I can view specific submissions.

Acceptance Criteria:

- Verify that the Sort By dropdown can sort submissions by ascending and descending submission date.
- Verify that the Search input box accepts alphanumeric keywords.
- Verify that the administrator page includes a section where previous submissions can be review.

### Epic 3: Archive Data Visualization

As a user, I want to have statistics about the materials in the archive so that I can better understand the scope of the archive and its contents.

**User Story 5:** As a user, I want to see data visualizations of the records so I can easily engage with history in a way that is visually-appealing and easy to understand.

Acceptance Criteria:

- Verify that the web app displays charts with numerical information about the items depending on categories like Student Organization, Date, and Location.
- Verify that the charts have accessible color palettes.

**User Story 6:** As a user, I want to customize the data visualization so I can explore topics that are most interesting to me.

Acceptance Criteria:

- Verify that the charts have respective input boxes and search buttons for customization within categories.
- Verify that the search criteria can be removed from the individual charts.

## Performance Requirements

### Epic 3: Performance

As a user, I want the web app to have quick performance so I can have a seamless experience in exploring and contributing to the archive.

**User Story 7:** As a user, I want the submission page to quickly receive my information so I know that my response has been recorded.

Acceptance Criteria:

- Verify that the submission page displays a confirmation message within 5 seconds of the form being submitted.
- Verify that the submission page displays a “Still Working” message after 5 seconds if the form has not yet been entered into the database.

**User Story 8:** As a user, I want the administrator page to verify my login quickly so that I can access the submission approval page in a timely manner.

Acceptance Criteria:

- Verify that the login is authorized within 3 seconds after the user attempts to log in.
- Verify that the submissions are displayed within 3 seconds after logging in.

**User Story 9:** As a user, I want the data visualization charts to update quickly, so that I can immediately see the changes I made to the charts.

Acceptance Criteria

- Verify that the charts update within 2 seconds of making customizations.

## Development Environment Requirements

### Epic 4: Development

As a developer, I want to enhance user interactions and streamline development processes so that both end-users and developers experience an efficient web app.

**User Story 10:** As a developer, I want to ensure secure user authentication and real-time data storage, so that users can confidently submit and access archival records.

Acceptance Criteria:

- Verify that Google Firebase Authentication is implemented.
- Verify that Google Firebase Storage and Firestore are implemented.
- Verify that users can securely log in using their credentials.
- Verify that the submitted archival records get stored in the databases.

**User Story 11:** As a developer, I want to include a data visualization experience so that users can interact dynamically with charts and explore archive information.

Acceptance Criteria:

- Verify that D3.js is implemented.
- Verify that the charts are dynamic and interactive.
- Verify that the charts are responsive to user customization and interaction.

**User Story 12:** As a developer, I want to maintain uniformity with the Node version so that all developers are working with the same features.

Acceptance Criteria:

- Verify that Node v18.17.0 and above are listed as a development requirement in the documentation.

**User Story 13:** As a developer, I want to have a streamlined deployment process so that changes can be quickly pushed to production.

Acceptance Criteria:

- Verify that the application deploys via Vercel.
- Verify that the application can be accessed by any user with any standard web browser.

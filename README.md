# Media Manager

> An 'Image Repository' submission for Shopify's Summer 2021 Backend Developer Internship

Production companies have a team of people to produce their assets rapidly. To meet their needs, Media Manager has 3 key features:
1) Uploading images privately, as a cloud-based back-up solution
2) Sharing images within their organization, when seeking approvals
3) Sharing approved images with the public


## Overview

- The system can support multiple organizations on one instance.
- Each organization must have 1 owner, but can have any number of admins & members.
- A user can be a member of any number of organizations (even no organization).
- All images go through the following 3 stages in order:
    - First, they are uploaded to personal storage.
    - Then, they can be moved under an organization the user is a member of. At this point, the image will be marked as pending approval.
    - Finally, an admin or owner will be able to move this image to become public.


## Existing Users

### Blue Media

| Email                   | Password | Token |
|-------------------------|----------|-------|
| owner@bluemedia.com     | password | eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXVkIjoic2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXV0aF90aW1lIjoxNjEwOTM1MjYxLCJ1c2VyX2lkIjoiVEc0aGhFcWFQa1VhQVNmQ3B0RU1MTlNVbERxMiIsInN1YiI6IlRHNGhoRXFhUGtVYUFTZkNwdEVNTE5TVWxEcTIiLCJpYXQiOjE2MTA5MzUyNjEsImV4cCI6MTYxMDkzODg2MSwiZW1haWwiOiJvd25lckBibHVlbWVkaWEuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm93bmVyQGJsdWVtZWRpYS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ZubrFh1Nsg3813Jdwz8G3meIxLPztYHYtdyup0n3LpT9DyOA1vNZZBOaITcKJeFkm3pTVYLzcko-KUDjOHFOFou25KSiF-0ZoMotzBp-C85nxKqL99VPFdnvguuIS6XKdRNGeF_6m9MwhoJ8Bhdb4F2JXTUESVyUpBen8O2O0nFW7iJ6cWBJptFRNW1Ck7GITxaSVjyxSHmXFal7dDeh3pwEY4-ky-bcq-_QmpskL0S2nwZ3jqafMoOxQHS8XXQOiHnNCq5qfnngvE4tHH2ZLgySjfTkR-E-6x7AG3A9cW0TgmFaphi_WS8GRZFFrOhgQ0jZv9GGpkf34xjgXSzAFA     |
| admin1@bluemedia.com    | password |       |
| admin2@bluemedia.com    | password |   eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXVkIjoic2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXV0aF90aW1lIjoxNjEwOTM1NTQyLCJ1c2VyX2lkIjoiZ25Lb2Z5d1p1UGdkY0R1QzQwVkU3MG4ybW4xMyIsInN1YiI6ImduS29meXdadVBnZGNEdUM0MFZFNzBuMm1uMTMiLCJpYXQiOjE2MTA5MzU1NDIsImV4cCI6MTYxMDkzOTE0MiwiZW1haWwiOiJhZG1pbjJAYmx1ZW1lZGlhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbjJAYmx1ZW1lZGlhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.C8AIQlzXdxgYz0MIAESRvTd9RlyB9XEmH-HcI67F6cCwGcJZ8mUjXj6OzkASNUinSV4AMOcxukDJquwXgCGHfdJ0IieHdTYrBzNBrVW_j-w2GNwv8r42DMlWM-AOV5xY0xHzxk7adu7s2QqU_LToDVIpqH4xLzN57XY463FDjr6p9D4fQJ4WUuHW6XInsPODzkdxum1nd2kNr9_8oFhITKHuPCL_4fmVe9m7C9sa5X-HD7X2-rXmNzUVI1QsxhQvV3I62iCTs4cGZvuZuc_A_GnQnHhVxfVN2g2LCxKTK6wInIr_w6DPP7GfXx_8Xec100xRcte9s22m9Zi8Vf9Xhg    |
| employee1@bluemedia.com | password |       |
| employee2@bluemedia.com | password |   eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXVkIjoic2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXV0aF90aW1lIjoxNjEwOTM1NzkwLCJ1c2VyX2lkIjoiejk3TVhCUU1TYU9hMnVjUVFyUTBlblJFeGZzMiIsInN1YiI6Ino5N01YQlFNU2FPYTJ1Y1FRclEwZW5SRXhmczIiLCJpYXQiOjE2MTA5MzU3OTAsImV4cCI6MTYxMDkzOTM5MCwiZW1haWwiOiJlbXBsb3llZTJAYmx1ZW1lZGlhLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJlbXBsb3llZTJAYmx1ZW1lZGlhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Tkn_o3wriop59aFj_4EnDuytmSZT8YJeXoa5O7wspbps97Tv0gXn3WV9kRJrOGkHRSXbu4BG4K6N0WraZuce5MTY2hQKZ5OToPEQ2MFQdPEM13zobX23X__Y6aD93Ms_4YTJ7tcnYsCT1JC5lqYru_iyqAOjYDZzVRjw4p0hwq09Z5m9hfoqrfmkDX-eV4W3q0ZJzRRyrq6xacTdhj7EYaz7EWQKJbPoEa6MQIt6lL-JjH-wCNwXWmJhZJWHmYnId7m12WlhoUKaBBPnBvvzTt84Qhku86gbV8TdvrhNacUkWYf_OkNUJrBE8LAjkmSZhsxxfk1TImQv6OFvxyz3Gw    |

Note: There is no requirement for emails of an organization to use the same domain name.

### Unaffiliated Users

| Email                   | Password | Token |
|-------------------------|----------|-------|
| dakota.mcinnis@mail.utoronto.ca | password |   eyJhbGciOiJSUzI1NiIsImtpZCI6IjVmOTcxMmEwODczMTcyMGQ2NmZkNGEyYTU5MmU0ZGZjMmI1ZGU1OTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXVkIjoic2hvcGlmeS1iYWNrZW5kLXN1bW1lci0yMDIxIiwiYXV0aF90aW1lIjoxNjEwOTM1OTEzLCJ1c2VyX2lkIjoiSUpVME92eWpHR2cxQnNRTGNHcGpGWjkxRUFCMiIsInN1YiI6IklKVTBPdnlqR0dnMUJzUUxjR3BqRlo5MUVBQjIiLCJpYXQiOjE2MTA5MzU5MTMsImV4cCI6MTYxMDkzOTUxMywiZW1haWwiOiJkYWtvdGEubWNpbm5pc0BtYWlsLnV0b3JvbnRvLmNhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRha290YS5tY2lubmlzQG1haWwudXRvcm9udG8uY2EiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.HQQii8UptqirMUjAxOypuriyFCTaNxblRoFcWWmC89S6e1CS01evfE_5lMrFNzGMKfNomtoXt20yie01WFrSyZ8-JNqD6Z7Yr1wD1jyY6GZSPabUhsD8CRiXrqRJrZbRHez_e2cxQa6FNZFFEmrla0gsrTf30Jug_5LwIXbhOtEOwydMyyTAGhjE_-tsgxyXPsSNuBNeVm_3pn6E-BRnpG2inwlKB0OxvMFfS5eoo1GZxo40ECMZ5mqSsW_zcpEdcqP0uM4YDk-9TISsG2lZsqwTYIUs2OK20nWxCxfTFLePgbQfh8kdtBHa7zEmz5bTQg2iKUAeC0JUz9cS1OquxQ   |


## Using the system


TODO: Complete


## Security Measures

#### Descriptions

**Organization Membership:**
- While the organization document does contain the ids of the owner and the admins, it does not contain the member ids (in order to support extremely large organizations). Instead, this document contains a `memberPrivateKey`. If a user document has the value `organizationId : memberPrivateKey` in their `organizations` map, then they gain access to the pending images of an organization.

**Photo Permissions:**
- Private photos can only be read/written by their owners.
- Pending photos can only be read by members of an organization.
- Pending photos can only be approved by owners or admins.
- Public photos can be viewed by anyone (even those outside the organization)

#### Technical Implementation

- See `firestore.rules`
- See `storage.rules`
- Notice that any APIs (which are implemented by interacting with data in "admin" mode) do not expose undesired privileges to the incorrect users.


## Tech Stack

- Typescript
- Firebase
  - Hosting
  - Authentication Product
  - Firestore Product (Database)
  - Cloud Storage Product (File Upload)
  - Cloud Functions (Backend Triggers + HTTP Requests)


## Other Notes

- There are ToDos in the "./functions" folder related to HTTPs Endpoints I had planned to make
  - Namely, this relates to organization management
  
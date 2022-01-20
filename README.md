# Shopify Backend Developer Intern Challenge and Production Engineering Challenge

The frontend for the application is hosted at: [https://shopify-inventory-system.netlify.app/](https://shopify-inventory-system.netlify.app/)

The backend for the application is hosted at: [https://shopify-inventory-system.herokuapp.com/](https://shopify-inventory-system.herokuapp.com/)
- This is simply for hosting the API routes, there are only two different routes: "/api/items" which takes care of data regarding the inventory items, and "api/groups" which takes care of data regarding the named groups.

## Description
In these two challenges, I was required to build an inventory tracking web application for a logistics company.
The frontend simply allows the user to view a table that displays all the information on the current inventory. The user can also fill out forms to add new inventory items to the database, they can select and mass delete the selected inventory items from the table and they can also modify the information of the current items. The backend is simply used for handling the HTTP requests made by the frontend. 

Furthermore, the I included one additional feature which was the assignment of an inventory item to a named group. To complement this addition, I also added a form to the frontend which allows users to add new groups to the database. 

## Tech Stack
I built the frontend of this application using __React.js__ and I built the backend using __Express.js__. I used a __MongoDB__ database and two collections "groups" and "items" to store all the data regarding the groups and inventory items. In addition to that, I used __heroku__ to host my backend server and used __NetlifyCMS__ to host my frontend web application. 

## Usage
A user can interact with all the api routes through the frontend by filling out the text boxes and clicking the various buttons.
- In order to add a new inventory item, the user must fill out an item name, stock and select a group. Then once the required information has been filled out, the user can click "Add New Item" to insert the new inventory item into the database.
- To delete inventory items, the user must select the desired item by clicking the checkbox beside the row in which the item appears. Then after making all the selections, they can click "Delete Selected Items" to remove the item from the database.
- To edit the existing items, a user can click the edit button in each row of the table. This allows that row to be edited. Once all edits are made, the user can click Finish and then click Save Changes to reflect the changes on the database.
- To add a new group, the user must simply fill out the group name and then click "Add New Group" to insert the new group into the database. 

## Testing
There are two ways the reviewer can test the backend routes.
- The first is the easier way, which is to simply use the frontend to send requests to the backend, since the frontend covers inputs to access all backend api routes.
- The second way is to use Postman ([Download](https://www.postman.com/downloads/)). 
    - After having installed Postman the reviewer can download the __ShopifyAPIRoutes.postman_collection.json__ file located in the __Testing__ folder of the GitHub repository. 
    - Then, once downloaded, they can click import button located to the right of __My Workspace__. 
    - In the popup simply browse and select the __ShopifyAPIRoutes.postman_collection.json__ file.
    - Then click Import, and the testing collection should be imported into Postman.
    - From here, you can simply test all the api routes.
    - If there is any issue, please refer to this [Documentation](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)
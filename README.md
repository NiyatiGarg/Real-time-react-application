# Whiteboard

## Available Scripts

To start the project, in the project directory, you can run:

### start keycloak:

1. run ```yarn init-keycloak```
2. go to ->  [http://localhost:8080/admin/master/console/#/](http://localhost:8080/admin/master/console/#/) and login with admin:admin
3. create a realm **whiteboard**
4. create a user (you can only set the required field username) go to credential and set a password also
5. create a client **whiteboard**

   1. set valid redirect URIs as -> http://localhost:3000/
   2. set web origins as -> http://localhost:3000
   3. save

   #### ```npm start```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## progress

- [X]  whiteboard session
- [X]  ability to draw
- [X]  ability to change color
- [X]  ability to change stroke width
- [X]  ability to change background color
- [X]  ability to undo
- [X]  ability to redo
- [X]  download canvas image
- [ ]  ability to upload images
- [ ]  ability to classify images using a pre-trained model
- [X]  authentication
- [ ]  allow multiple users to draw

## Screenshot








<img width="1440" alt="Screenshot 2023-10-28 at 1 51 50 PM" src="https://github.com/NiyatiGarg/Real-time-react-application/assets/119442591/f208a74a-4f98-474a-af68-0286892bf4c9">

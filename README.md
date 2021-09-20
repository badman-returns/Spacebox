# SPACEBOX


[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/tsgoswami)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/tsgoswami) 
[![Made With Love](https://img.shields.io/badge/Made%20With-Love-blue.svg)](https://github.com/tsgoswami)

:star: Glad to see you here! Show some love by [starring](https://github.com/tsgoswami/Spacebox) this repo.

![License](https://img.shields.io/github/license/tsgoswami/Spacebox?style=for-the-badge)
<p align="center">
  <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632059351/LOGO_euivcl.png" />
</p>

<p align="justify">
Spacebox is the ultimate social hiring platform for developers and recruiters that eliminates the classic resume based shortlisting process. This allows developers to share their projects from github and showcase it in their spacebox profile as their portfolio making it easy for recruiters to select the candidate based on potential skills and ability. Spacebox also provide feeds thats let you share lastest stuffs among developers and recruiters.
</p>


[![Production Link](https://img.shields.io/badge/Production%20-Link-success?style=for-the-badge&logo=appveyor)](https://spacebox-ts.netlify.app/)
[![API Documentation](https://img.shields.io/badge/API%20-Documentation-informational?style=for-the-badge&logo=appveyor)](https://documenter.getpostman.com/view/11794310/UUxtDVoj)  


## Features
- User can sign up as a developer (Github username is compulsory) or as a recruiter. 
- User can sign in using email and password once verified.
- Both developer and recruiter can post stuff on the feed.
- Both can view and edit their own profile
- Both can visit other users' profiles.
- eveloper profile contains projects fetched from Github and content respective developer posted.
- Rcruiter profile contains jobs and content posted by the respective recruiter.
- Rcruiter can add, edit and delete jobs
- Dvelopers can only view jobs.

<br>
<p>
<img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632065769/Screenshot_2021-09-19_205733_nes0r7.jpg">
</p>
<br>

## Demo
### Feed Page 
 - Contains contents posted by developers and recruiters.
 - Logged in user can visit profile of a user by clicking on the name or avatar on the post.
 <p align="center">
  <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632074783/Feed_oy004c.jpg" width="700"/>
 </p>
 
### Developer Profile
 - Contains unforked projects from github repository.
 - Also contains posts posted by developer in the activity section.
 - User can edit and update name, bio, email, github, profile picture and techstack by clicking on edit button.
 <p align="center">
 <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632074783/Profile_section_uo2sej.jpg" width="700"/> 
 </p>
 
### Recruiter Profile
- Contains jobs posted by recruiter.
- Jobs can be edited or deleted by clicking on edit and delete button.
- Also contains posts posted by recruiter in the activity section.
<p align="center">
  <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632075395/developer_profile_tr9dgl.jpg" width="700"/>
</p>

### Developer Job View
- Shows jobs posted by recruiters.
- Clicking on each job, description is shown in the right panel.
- Recruiter profile can be visted by clicking on the name or avatar of the recruiter.
<p align="center">
  <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632074783/Developer_Job_view_seezif.jpg" width="700"/>
</p>

### Recruiter Job View
- Contains form for posting new job.
- Job listing in the middle
- Job description will appear on clicking specific job.
<p align="center">
  <img src="https://res.cloudinary.com/dui3gfpuj/image/upload/v1632074783/Recruiter_Job_view_yxn7li.jpg" width="700"/>
</p>

## Technology Stack
### Frontend
[![Deployement](https://img.shields.io/badge/Deployement-Netlify-blue?style=for-the-badge&logo=appveyor)](https://www.netlify.com/)
 -  React JS
 -  Redux
 -  Redux Persist
 -  Material UI
 -  React Toastify
 -  React Quill
 -  Moment JS
 -  HTML React Parser
 -  Dompurify
 -  Axios 
 
### Backend
[![Deployement](https://img.shields.io/badge/Deployement-Heroku-blueviolet?style=for-the-badge&logo=appveyor)](https://www.heroku.com/)
 - Node.js
 - Express
 - Express Validator
 - Cloudinary
 - Google APIs
 - Mongoose
 - Bcrypt
 - JSON Web Token
 - Multer
 - Morgan
 - Nodemailer
 - Body Parser

### Languages
- TypeScript
- Javascript

### Database
MongoDB




## Setup
#### Environemental Variables for Frontend
```
REACT_APP_BASE_BACKEND_URL = http://localhost:8080 for development
REACT_APP_BASE_BACKEND_API_URL = http://localhost:8080/api/v1 for development
REACT_APP_GITHUB_API_URL = https://api.github.com
```

##### Environmental Variables for Backend
```
BASE_URL = Set your frontend URL e.g - localhost:3000/# for development
GITHUB_API = https://api.github.com
SECRET = eg. eyJhbGciOiJIUzI1NiIsInR ... for generating JWT Tokens
MONGODB_URI = URI for connecting to MongoDB Database.
MONGODB_POOLSIZE = 10 or you can set to your custom
MAIL_SERVER_HOST = eg. smtp.gmail.com - Set it to yours.
MAIL_USER = eg. youremail@gmail.com 
PORT = 8080 or Set Default Port
CLIENT_ID = Client ID generated by Google Cloud Console for Oauth2.0
CLIENT_SECRET = Client Secret generated
REFRESH_TOKEN = Refresh token generated
REDIRECT_URL = eg https://developers.google.com/oauthplayground
CLOUDINARY_CLOUD_NAME = Cloudinary cloud name
CLOUDINARY_API_KEY = Cloudinary API Key
CLOUDINARY_API_SECRET = Cloudinary API Secret
```
For seting up Oauth2.0 on GCC. Refer here - [Sending Email with Gmail and Oauth2.0]

Backend
```
cd backend
npm install
npm run local -- for development or npm start -- for production
```
Frontend
```
cd frontend
yarn install
yarn start
```

## Upcoming Features
1. Real time feed updates.
2. Connection or Friend Request Feature.
3. Chat with other users.
4. Advance Profile Editing and Customization.

## Upcoming Improvements
1. Add eslint and prettier configuration to react code.
2. Implementing Airbnb javascript best practices.
3. Unit testing.

***And a lot more to come yet.***

[![Facebook](https://img.shields.io/static/v1.svg?label=follow&message=@tsgoswami&color=black&logo=facebook&style=for-the-badge&logoColor=white&colorA=blue)](https://www.facebook.com/trishnangshu.goswami/)  [![Instagram](https://img.shields.io/static/v1.svg?label=follow&message=@tsgoswami&color=black&logo=instagram&style=for-the-badge&logoColor=white&colorA=blue)](https://www.instagram.com/letstalkcs/) [![LinkedIn](https://img.shields.io/static/v1.svg?label=connect&message=@tsgoswami&color=black&logo=linkedin&style=for-the-badge&logoColor=white&colorA=blue)](https://www.linkedin.com/in/trishnangshugoswami/) [![Twitter](https://img.shields.io/static/v1.svg?label=connect&message=@tsgoswami&color=black&logo=twitter&style=for-the-badge&logoColor=white&colorA=blue)](https://twitter.com/ts_goswami)
> Made with 🖤 by Trishnangshu Goswami

[Sending Email with Gmail and Oauth2.0]: https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1


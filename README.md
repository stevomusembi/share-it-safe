This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You will need to create a .env file at the root of the project. 
Add the following variables from your personal AWS acount.
1. AWS secret_Access_Key
2. AWS Access_Key_Id
3. AWS Region
4. AWS bucket_Name

Make sure to save the variables names in a similar way to how they are used in the code.<br>
On your AWS account you will need to create a lamda function that generrates pre-signed URLs for the file in S3.<br>
Create a AWS api gateway that will trigger the lamda function to generate the URL. <br>

>So after a user uploads a file to the bucket successfully we call the API gateway with a POST request with the file name, which in turn passes the file name to the
lamda which generates a unique URL and the API gateway responds with this URL and we display it on our web app.

**Make sure to set up the valid permissons on the S3 bucket to allow lamda access to getObjects from the bucket.**
**Also dont forget to add API gateway as the trigger for the lamda function**

I deployed the web app on AWS Amplify. <br>
First create a new app on AWS Amplify, <br> Then link you github and select the repo with this project, follow the next steps and add the evironment variables. <br>
Deployment will be done and it will also set up CI/CD for you as when you make changes to the main branch it triggers a new deployment.



## About
This is a Nextjs web app that allows a user to securely upload a file to amazon S3 bucket. The application generates unique, time-limited links, ensuring that only authorized users with the link can access the uploaded files for a specified duration.

### Technologies and Skills:
<ul>
<li> Next.js: Utilized for building a dynamic, server-rendered React application, ensuring a seamless user experience</li>
<li> AWS Lambda: Implemented serverless functions to handle backend logic, providing scalability and cost-efficiency.</li>
<li> AWS API Gateway: Configured to create, publish, maintain, monitor, and secure APIs at any scale. </li>
<li> Amazon S3: Leveraged for secure, scalable, and durable file storage.</li>
<li> AWS Amplify: Used for hosting and deploying the application, ensuring continuous integration and delivery.</li>
</ul>


### Key Features:
Secure File Upload: Users can upload files securely to Amazon S3.
Time-Limited Links: Automatically generates unique, time-limited links for file sharing.
Access Control: Ensures only authorized users with the link can access the files within the specified duration.

>This project showcases my ability to integrate various AWS services to build a secure, scalable, and user-friendly web application.

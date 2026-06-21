# Reflection

## What did you ask the AI to do?

I asked ChatGPT to help me implement my "Additional Entity Frontend," which is the comment functionality in my Fakebook application. Specifically, I wanted comments to behave similarly to Facebook, where users can click a Comments button on a post card and have the card expand downward to display comments. I also asked for the ability to create, edit, and delete comments directly within the expanded comments section. Finally, I requested toast notifications for comment actions and guidance on properly configuring React Toastify.

## What did it do well?

ChatGPT helped design a Facebook-style comment system that fit naturally into my existing post cards. It provided backend and frontend code for retrieving comments by post, creating comments, editing comments, and deleting comments. It also helped troubleshoot a 401 Unauthorized error when fetching comments and explained how to properly pass authentication tokens in requests. Additionally, ChatGPT explained how React Toastify should be configured using a single global ToastContainer and how toast notifications can be triggered from individual components.

## What did it get wrong or what did you have to fix?

Initially, ChatGPT suggested creating separate pages for viewing comments and creating comments. After reconsidering the desired user experience, I decided that comments should be embedded directly inside each post card instead of using separate pages. ChatGPT then adjusted its approach to match the Facebook-style design. Another issue was that the ToastContainer was originally placed inside the PostCard component, causing it to appear within the post card layout. I had to move the ToastContainer to a higher-level component such as App.jsx and keep only the toast import in PostCard.jsx.

## What did you learn from working with it?

I learned how to create expandable comment sections inside React components, how to fetch related data using route parameters, and how to implement CRUD operations for comments. I also learned how to manage authenticated API requests using JWT tokens and how to properly configure React Toastify using a single global ToastContainer. Most importantly, I learned that component placement matters, since placing UI elements like ToastContainer inside reusable components can lead to unintended layout behavior.
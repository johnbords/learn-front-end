# Reflection

## What did you ask the AI to do?

I asked ChatGPT to help me implement the "View One" requirement for my Fakebook application. This involved reviewing my existing frontend and backend files, determining whether the functionality already existed, and identifying what was missing. I also asked for help creating navigation from the list of posts to an individual post page and improving the layout of the post details page.

## What did it do well?

ChatGPT correctly identified that my backend already supported retrieving a single post and that my React routing for the post details page was already configured. It determined that the missing piece was the navigation from the post list to the details page. It generated the code needed to add a "View Details" button, explained how to test the feature, and helped improve the layout and styling of the post details page.

## What did it get wrong or what did you have to fix?

Some layout suggestions did not immediately work because ChatGPT could not see my CSS styling. After I provided the CSS file, I had to adjust the spacing and alignment based on my existing margins. I also encountered a JavaScript "Illegal return statement" error after modifying the component, which required fixing the placement of the return statement within the React component.

## What did you learn from working with it?

I learned how frontend navigation, backend API routes, and React components work together to implement a details page. Additionally, I learned that styling issues are often caused by existing CSS rules and that debugging layouts requires examining both the component structure and the associated styles.

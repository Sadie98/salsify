# Hello Salsify team!

I am very glad that I had the opportunity to complete your test task. Although I was told about a couple of hours, I admit it took me about 1.5 working days. However, this has had a wonderful effect on the project.

## Technology stack

I hope you already know that I work with **Vue.js**. Therefore, at the heart of the project, of course, it is.

I chose **Vite** as the build tool. At the moment, this is the fastest (quick build, hot reboot, etc.) solution. Accordingly, for testing, I also chose the **Vitest** library to comply with a single infrastructure. The application uses the standard Vue store - **Pinia**. All code is written on **Typescript**.

Also, I used preprocessors - **scss** and **pug**, it's just nice. Also I used **B-Vue** (you wrote design doesn't matter, so I thought it's a sign).

## Project structure (src folder)

- **assets** - almost empty, it's site icon
- **components** - all UI components, I tried to break it down into components as much as possible (within reasonable limits).
- **composables** - it's app storage. All logic is inside it and is tested.
- **consts** - it's kind of phrases dictionary, but I didn't use normal, since there's just 3 phrases.
- **helpers** - helper functions, mostly for data mapping. Also, here're tests.
- **mocks** - mocks you provided
- **types** - there's just 1 file with types used

## Plan of my development

As I mentioned, I made this project in 1,5 working days. That's what I did by hours:

- **1 hour** - init project, install bootstrap and all additional libs
- **2 hour** - created a table component
- **3 hour** - created map functions to be acceptable by table
- **4 hour** - started implementing filters
- **5 hour** - created store
- **6 hour** - connecting filters with store
- **7 hour** - finished filters logic
- **8 hour** - refactored using new store for filters
- **9 hour** - bugfixing, started testing
- **10 hour** - tests development
- **11 hour** - final refactoring
- **12 hour** - deployment

## My general thoughts
- First of all, I read a description, it was long, so I opened images (I love images). There I understood I need table component and dropdowns (two of them advanced)
- So, without reading other description, I implemented table and filled it with data
- After it I needed to reread description again and understand how filters work.
- I made filters in very stupid manner, just to implement functionality
- After everything started working as expected, I started refactoring - filters component was too big and complicated. I moved eaach filter to their components and moved logic to store (both options are ok, but this is clearer).
- Then after all fixes I started making tests when realized everything works as I expected
- In the end I deployed project in Digital Ocean (I hope you will appreciate!)

## My general thoughts
All in all, it was interesting task, and I made this project to be clear and scalable. It would be possible to do it faster, but less efficiently, and it could take longer and more efficiently. Nevertheless, it seemed to me that my solution is the perfect balance for a test task.


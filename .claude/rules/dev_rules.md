# Development Rules 

## General Principle
- Each page must have its own route
- Build each page section by section and make sure each section is in it's own file
- Follow Separaiton of concerns
- write a small (commented out) description of each component

## Building Principle
- Use flexbox for each page/section/component layout. Only avoid this when necessary.


## Folder Concerns
- `components/` for reusable components, page sections, and more
- `utils/` for utility and psuedo functions
- only add a folder when you consider it necessary, each folder must have a good usecase

## State
- Don't introduce a global state or slice unless truly necessary
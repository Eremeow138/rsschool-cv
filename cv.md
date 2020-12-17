# Aleksei Eremin
![my photo](https://eremeow.ru/wp-content/uploads/2020/09/site.jpg)
## Contacts
* **mail:** eremeow138@yandex.ru
* **phone:** - +7 (964) 218-12-87
* **telegram:** - EreMeow138
* **gitHub:** https://github.com/Eremeow138
* **website** https://eremeow.ru/

## About me
My goal is to get a job at EPAM as a Front-end developer. I want to work in a cool team and take maximum knowledge from it. I want to learn. I have such important qualities as kindness, honesty, stress resistance. 

## Code examples
```
//JS works in one thread, therefore we can't say about asynchronous
// But it works. But how does it work?
// All works thanks to conception EventLoop and CallStack in JS:

For example, let's try to figure out what gets logged to the console if we run the following:

const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();

// Let's quickly take a look at what's happening when we're running this code in a browser:
// 1. We invoke bar. bar returns a setTimeout function.
// 2. The callback we passed to setTimeout gets added to the Web API, the setTimeout function and bar get popped off the callstack.
// 3. The timer runs, in the meantime foo gets invoked and logs First. foo returns (undefined),baz gets invoked, and the callback gets added to the queue.
// 4. baz logs Third. The event loop sees the callstack is empty after baz returned, after which the callback gets added to the call stack.
// 5. The callback logs Second.
// look more here: https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
```

## Skills
* **Hard skills**
  * Basic HTML
  * Basic CSS
  * Basic JS
  * Basic PUG
  * Basic SCSS
  * Basic JQuery
  * Basic Git
  * Basic BEM
  
* **Soft skills**
  * Punctuality
  * Adaptability
  * Verbal communication
  * Non-verbal communication
  * Discipline
  * Teamwork
  * Humor
  * Tolerance
  * And just real good man (I hope)
  
## Work experience

###Landing Pages
* Freight Transportation
 * [GitHub](https://github.com/Eremeow138/freight_transportation)
 * [On hostig](https://eremeow.ru/projects/freight_transportation/index.html)


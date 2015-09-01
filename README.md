# React-RxJs-Todo-MVI-Example
Experiment using React JS, RxJS extensions, and based on proposed MVI functional concept.

[Futurice MVI article](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom)

[Andre Staltz MVI talk on Youtube](https://www.youtube.com/watch?v=1zj7M1LnJV4)


##The goals were:
* A parent module/component will import other modules and then "listen/subscribe" to stream events from that module see module.getIntent().
* Minimize passing React props down in favor of passing via someStream.onNext(data), see RxJS Observables and Subjects
* A parent module does not access imported module machinery i.e.  someImportedModule.someMethod().
* A parent module does not "pass in" parent.methods to child modules.

## Learnings:
* RxJS has a challenging learning curve, but appears very useful as one starts to "get it."
* Used an explicit "getIntent" method for subscribing, but it seems possible to extend/mixin RxJS to "build up" React Relay style component queries.
* Using RxJS to handle event/data streams (clicks, onchange, etc;) in favor of, or combination with React inline handlers can seem tricky, but I started to like the feeling of a component only needing to report an event or data without needing to know about any external methods or listeners.
* Chose a "pass data in at the top" model, but did experiment with module level import a store/cache...and can see how one might set up "cursor" like behavior or feed Immutable or Baobab for cursors.

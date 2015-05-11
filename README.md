# key.js
Short and easy handler for keypresses, supports onKeyDown, onKeyUp, a constant function and a doubletap function

It's easy enough to use:

Start off with initializing the script:
```html
  <script>
    key.init();
  </script>
```

Binding a function to a key:
```html
  <script>
  //bind a keyDown function to S
  key.on('S', 'keydown', function(){
    console.log('Firing the keyDown function of S');
  });
  
  //bind a constant function to S
  key.on('S', 'constant', function(delta){
    console.log('Firing the constant function of S, the delta ( ' + delta + ' ) can be used for smooth animations.');
  });
  
  //bind a doubletap function to S
  key.on('S', 'double', function(){
    console.log('Firing the doubletap function of S');
  });

  //bind a keyUp function to S
  key.on('S', 'keyup', function(){
    console.log('Firing the keyUp function of S');
  });
  </script>
```

A single key can have multiple functions bound to it as in the example above.

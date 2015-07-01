# Hello

The Modal Component For Developers

## Instalation and requirements
- Install jQuery
- Copy hello minified in "/dist" folder to your lib directory.


_Actually the hello component check if you got a JSS object created or not.  So, Nevermind. We can put the JSS component together._



## Features

- Auto position calcs to centralize modal component

- Full size mode 

- Shadow background

- Show/Hide animation

- Callback execution on modal events (Close, Load and Submit)

- Ajax content

- interoperable CSS (The Hello component haven't any theme. Only position properties.)



## Usage Examples

Markup:

```
	<div id="newsletterModal" class="hide">
	    <div class="hello-header">
	      <button type="button" class="hello-close">Close</button>
	    </div>
	    <div class="hello-body">
	      <h1>Tudo Muito Dark</h1>
	      <h2>Tudo Muito Dark</h2>
	      <h3>Tudo Muito Dark</h3>
	    </div>
	    <div class="hello-footer">
	      <button type="button" class="hello-submit">Submit</button>
	    </div>
	</div>

```

Javascript:

```
	var myModal = new Hello({
		element: 'newsletterModal', //or $('#newsletterModal')
		width: 600,
		height: 300,
		animation: true,
		shadow, true,
		ajax: '/something.html'
	});
	
	myModal.show();
```

## Settings

#### element (required)
**Type:** _string_ or jquery selector _object_ 

---

#### width
**Type:** _integer_ 

---

#### height
**Type:** _integer_ 

---

#### full
**Type:** _boolean_ 

Show the full size modal.

---

#### animation
**Type:** _boolean_ 

---

#### shadow
**Type:** _boolean_ 

Show the shadow background and lock screen.

---

#### load
**Type:** _function_ 

Execute callback after modal loading.

---

#### submit
**Type:** _function_ 

Execute callback on ```.hello-submit``` click.

---

#### close
**Type:** _function_ 

Execute callback on ```.hello-close``` click.

---

#### ajax
**Type:** _string_ 

Input data received from a request on modal body.

---

## Methods

Show/Hide modal with:

```
	myModal.show();
`
	myModal.hide();
```

## License

MIT 2015




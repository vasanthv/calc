(function(){
	if(typeof localStorage.probs == 'undefined'){
		localStorage.probs = JSON.stringify(['1 + 2', '2.2 inches to meter', '2.2 in to m', 'sin (45)']);
	}
	if(localStorage.probs != ''){
		var arr = JSON.parse(localStorage.probs);
		for (var i = 0; i < arr.length; i++) {
			addCalc(arr[i], false);
		}
	}

	if(localStorage.current)
	document.getElementById('textbox').value = localStorage.current;
	document.getElementById('textbox').focus();
})();
document.getElementById('textbox').addEventListener('keydown', function(evt){
	if(evt.keyCode == 13){
		evt.preventDefault();
		if(document.getElementById('textbox').value)
		addCalc(document.getElementById('textbox').value, true);
		return false;
	}else if(evt.keyCode == 8){
		if(document.getElementById('textbox').value == ''){
			var arr = JSON.parse(localStorage.probs);
			if(arr.length > 0){
				arr.pop();
				localStorage.probs = JSON.stringify(arr);
				document.getElementById('calculator').removeChild(document.getElementById('calculator').lastChild);
			}
		}
	}
});
document.getElementById('textbox').addEventListener('keyup', function(evt){
	setTimeout(function(){
		localStorage.current = document.getElementById('textbox').value;
	}, 10);
});
function addCalc(equation, isnew) {
	if(isnew == true){
		if(localStorage.probs){
			var arr = JSON.parse(localStorage.probs);
			arr.push(equation);
			localStorage.probs = JSON.stringify(arr);
		}
		else localStorage.probs = JSON.stringify([equation]);
	}

	var resultVal = math.eval(equation);
	if(resultVal % 1 !== 0)
	resultVal = math.format(resultVal, {notation: 'fixed', precision: 3});
	var eqwrap = document.createElement('div');
	eqwrap.className = 'eqwrap';

	var eq = document.createElement('div');
	eq.className = 'eq';
	eq.innerHTML = parser(equation);
	eqwrap.appendChild(eq);

	var result = document.createElement('div');
	result.className = 'result';
	result.addEventListener('click', resultClick);
	var resspan = document.createElement('span');
	var res = document.createTextNode(resultVal);
	resspan.appendChild(res);
	result.appendChild(resspan);

	eqwrap.appendChild(result);

	document.getElementById('calculator').appendChild(eqwrap);
	document.getElementById('textbox').value = '';
	document.getElementById('textbox').focus();
}
function resultClick(evt){
	document.getElementById('textbox').value += this.innerText;
	document.getElementById('textbox').focus();
	localStorage.current = document.getElementById('textbox').value;
}
function parser(string){
	string = string.replace(/[=()+\-*/.]/g, '<span class="op">$&</span>').replace(/[0-9]/g, '<span class="num">$&</span>');
	return string;
}

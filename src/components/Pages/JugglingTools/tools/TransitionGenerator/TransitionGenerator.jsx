import React, { FormEvent } from 'react';
import { useState } from 'react';

const TransitionGenerator = () => {
	const [ss1, setSs1] = useState('');
	const [ss2, setSs2] = useState('');

	const [transPeriod1, setTransPeriod1] = useState(0);
	const [transPeriod2, setTransPeriod2] = useState(0);

	const [trans1To2, setTrans1To2] = useState(0);
	const [trans2To1, setTrans2To1] = useState(0);

	const [maxH1, setMaxH1] = useState(0);
	const [maxH2, setMaxH2] = useState(0);

	const [error, setError] = useState(null);

	const generate = (e) => {
		e.preventDefault();
		setError(null);
		//Strings
		let ss = ''; //string of SS
		let ssaux = ''; //string aux
		let tts = ''; //string of transitions throws

		//Arrays
		let SS = []; //SiteSwap used in Properties()
		let SP = []; //State Patern used in Properties()
		let SS1 = []; //SiteSwap 1
		let SS2 = []; //SiteSwap 2
		let SP1  = []; //State Patern of SiteSwap 1
		let SP2 = []; //State Patern of SiteSwap 2
		let SP1copy= SP1; //Copy of SP1
		let SP2copy = SP2; //Copy of SP2
		let SP1aux = []; //State Patern of SiteSwap 1 modefied
		let SP2aux = []; //State Patern of SiteSwap 2 modefied
		let SP1time = []; //Timebeat in the Patern of SP1aux
		let SP2time = []; //Timebeat in the Patern of SP2aux
		let a = []; //Timebeat elements belonging solo to SP1aux
		let b = []; //Timebeat elements belonging solo to SP2aux
		let TT= []; //Array with the Transitions Throws
		let TTaux = []; //List of Transitions Throws
		let SSprint = []; //SiteSwap: SS1 + TT12 + SS2 + TT21
		let Tbeat= []; //	Timebeat of SS
		let Timebeat= []; //	Ideal Timebeat of SS
		//

		//Logicals
		let stop_program = false; //Stop the program
		let async = false; //Check if Siteswaps are asynchronous
		let async1 = false; //Check if SS1 is asynchronous
		let async2 = false; //Check if SS2 is asynchronous
		let Transitions1 = false;
		let Transitions2 = false;
		//

		//Integeres
		let Balls = 0; //Number of Balls of SS
		let Balls1 = 0; //Number of Balls of SS1
		let Balls2 = 0; //Number of Balls of SS2
		let zeros = 0; //Number of zeros in the left of SP
		let zeros1 = 0; //Number of zeros in the left of SP1
		let zeros2 = 0; //Number of zeros in the left of SP2
		let lenTime = 0; //Number of beats of SS
		let Sum = 0; //Sum of throws of SS
		let LSP = 0; //Length of SP1
		let twos = 0;
		let Period = 0;
		let Hmax = 0;
		//
		let plus = 0;
		let top = false;
		let aux = '';
		let ht = false;
		let ht12 = false;
		let ht21 = false;
		let htOk = true;

		// Are either siteswap sync?
		if (ss1.indexOf('(') !== -1) {
			async1 = true;
			setTransPeriod1(prev => prev * 2);
		}
		if (ss2.indexOf('(') !== -1) {
			async2 = true;
			setTransPeriod2(prev => prev * 2);
		}

		// Is one async and the other not?
		if ((async1 && !async2) || (!async1 && async2)) {
			ht = true;
			ss = ss1;
			async = async1;
			duplicate();
			setSs1(ss);
			ss = ss2;
			async = async2;
			duplicate();
			setSs2(ss);
		}
		// Show which one is which
		if (!async1 && async2) ht12 = true;
		if (async1 && !async2) ht21 = true;

		// Check if siteswap #1 is valid
		if (!stop_program) {
			ss = ss1;
			Hmax = maxH1;
			Properties();
			SS1 = SS;
			SP1 = SP;
			Balls1 = Balls;
			zeros1 = zeros;
			setMaxH1(Hmax);
			const n1 = Math.ceil(Balls / lenTime) * 2;
			if (Timebeat + 'a' !== Tbeat + 'a') {
				setError('Siteswap #1 is not valid!');
				stop_program = true;
			}
			ss = '';
			SS = [];
			SP = [];
			Timebeat = [];
			Tbeat = [];
			lenTime = 0;
			Balls = 0;
			zeros = 0;
			Sum = 0; //RESET
		}

		// Check if siteswap #2 is valid
		if (!stop_program) {
			ss = ss2;
			Hmax = maxH2;
			Properties();
			SS2 = SS;
			SP2 = SP;
			Balls2 = Balls;
			zeros2 = zeros;
			setMaxH2(Hmax);
			let n2 = Math.ceil(Balls / lenTime) * 2;
			if (Timebeat + 'a' !== Tbeat + 'a') {
				setError('Siteswap #2 is not valid!');
				stop_program = true;
			}
			ss = '';
			SS = [];
			SP = [];
			Timebeat = [];
			Tbeat = [];
			lenTime = 0;
			Balls = 0;
			zeros = 0;
			Sum = 0; //RESET
		}

		if (!stop_program && Balls2 !== Balls1) {
			setError('The number of props in the two siteswaps are different!');
			stop_program = true;
		}

		/********************************************************************************
		 *     		             G E T   T R A N S I T I O N S  						*
		 *********************************************************************************/

		if (!stop_program) {
			var ti = new Date();

			Period = transPeriod1;
			Hmax = maxH1;
			SP1aux = SP1;
			SP2aux = SP2;

			Transitions1 = true;
			Transitions2 = false;
			rearangeSPaux();
			generateSPaux();
			var Qt1 = plus;
			var tf = new Date();
			setTrans1To2(Qt1);

			var ti = new Date();
			ss = ss2;
			Properties();
			SS1 = SS;
			SP1 = SP;
			Balls1 = Balls;
			zeros1 = zeros;
			ss = '';
			SS = [];
			SP = [];
			Timebeat = [];
			Tbeat = [];
			lenTime = 0;
			Balls = 0;
			zeros = 0;
			Sum = 0; //RESET

			ss = ss1;
			Properties();
			SS2 = SS;
			SP2 = SP;
			Balls2 = Balls;
			zeros2 = zeros;
			ss = '';
			SS = [];
			SP = [];
			Timebeat = [];
			Tbeat = [];
			lenTime = 0;
			Balls = 0;
			zeros = 0;
			Sum = 0; //RESET

			Transitions2 = true;
			Transitions1 = false;
			Period = transPeriod2;
			Hmax = maxH2;
			SP1aux = SP1;
			SP2aux = SP2;

			rearangeSPaux();
			generateSPaux();
			var Qt2 = plus;
			var tf = new Date();

			setTrans2To1(Qt2);
		}

		/********************************************************************************
		 *     		            	 F U N C:  D U P L I C A T E  						*
		 *********************************************************************************/

		function duplicate() {
			if (ss.charAt(ss.length * 1 - 1) === '*') mirrow();
			let count = 0;
			if (!async) {
				let LCurve = false;
				let LSquare = false;
				ssaux = '(';
				for (let i = 0; i < ss.length; i++) {
					aux = '';
					if (ss.charAt(i) === '[') {
						LSquare = true;
						ssaux += '[';
					} else if (ss.charAt(i) === ']') {
						LSquare = false;
						ssaux += ']';
					} else if (
						ss.charAt(i) !== '(' &&
						ss.charAt(i) !== ',' &&
						ss.charAt(i) !== ')' &&
						ss.charAt(i) !== '[' &&
						ss.charAt(i) !== ']'
					) {
						if (ss.charAt(i) === '0') aux = '0';
						else if (ss.charAt(i) === '1') aux = '2x';
						else if (ss.charAt(i) === '2') aux = '4';
						else if (ss.charAt(i) === '3') aux = '6x';
						else if (ss.charAt(i) === '4') aux = '8';
						else if (ss.charAt(i) === '5') aux = 'ax';
						else if (ss.charAt(i) === '6') aux = 'c';
						else if (ss.charAt(i) === '7') aux = 'ex';
						else if (ss.charAt(i) === '8') aux = 'g';
						else if (ss.charAt(i) === '9') aux = 'ix';
						else if (ss.charAt(i) === 'a') aux = 'k';
						else if (ss.charAt(i) === 'b') aux = 'mx';
						else if (ss.charAt(i) === 'c') aux = 'o';
						else if (ss.charAt(i) === 'd') aux = 'qx';
						else if (ss.charAt(i) === 'e') aux = 's';
						else if (ss.charAt(i) === 'f') aux = 'ux';
						else if (ss.charAt(i) === 'g') aux = 'w';
					}
					if (!LSquare) count++;
					if (LSquare && aux !== '') {
						ssaux += aux;
					} else if (!LSquare && count % 2 !== 0 && i < ss.length - 1)
						ssaux += aux + ',0)(0,';
					else if (!LSquare && count % 2 !== 0 && i === ss.length - 1)
						ssaux += aux + ',0)';
					else if (
						!LSquare &&
						count % 2 === 0 &&
						count > 0 &&
						i < ss.length - 1
					)
						ssaux += aux + ')(';
					else if (
						!LSquare &&
						count % 2 === 0 &&
						count > 0 &&
						i === ss.length - 1
					)
						ssaux += aux + ')';
				}
				ss = ssaux;
				count = 0;
				for (let i = 0; i < ss.length; i++) {
					if (ss.charAt(i) === '(') count++;
				}
				if (count % 2 !== 0) {
					ss += '*';
					mirrow();
				} else {
					ss += ss;
				}
			}
			count = 0;
			if (async) {
				let LCurve = false;
				let LSquare = false;
				ssaux = '';
				for (let i = 0; i < ss.length; i++) {
					aux = '';
					if (ss.charAt(i) === '(') {
						LCurve = true;
						ssaux += '(';
					} else if (ss.charAt(i) === ',') {
						LCurve = true;
						ssaux += ',';
					} else if (ss.charAt(i) === ')') {
						LCurve = false;
						ssaux += ')';
					} else if (ss.charAt(i) === '[') {
						LSquare = true;
						ssaux += '[';
					} else if (ss.charAt(i) === ']') {
						LSquare = false;
						ssaux += ']';
					} else if (
						ss.charAt(i) !== '(' &&
						ss.charAt(i) !== ',' &&
						ss.charAt(i) !== ')' &&
						ss.charAt(i) !== '[' &&
						ss.charAt(i) !== ']'
					) {
						if (ss.charAt(i) === '0') aux = '0';
						else if (
							ss.charAt(i) === '2' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = '4';
						else if (
							ss.charAt(i) === '2' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = '4x';
						else if (
							ss.charAt(i) === '4' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = '8';
						else if (
							ss.charAt(i) === '4' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = '8x';
						else if (
							ss.charAt(i) === '6' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 'c';
						else if (
							ss.charAt(i) === '6' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'cx';
						else if (
							ss.charAt(i) === '8' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 'g';
						else if (
							ss.charAt(i) === '8' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'gx';
						else if (
							ss.charAt(i) === 'a' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 'k';
						else if (
							ss.charAt(i) === 'a' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'kx';
						else if (
							ss.charAt(i) === 'c' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 'o';
						else if (
							ss.charAt(i) === 'c' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'ox';
						else if (
							ss.charAt(i) === 'e' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 's';
						else if (
							ss.charAt(i) === 'e' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'sx';
						else if (
							ss.charAt(i) === 'g' &&
							ss.charAt(i + 1) !== 'x'
						)
							aux = 'w';
						else if (
							ss.charAt(i) === 'g' &&
							ss.charAt(i + 1) === 'x'
						)
							aux = 'wx';
						ssaux += aux;
					}
					if (!LCurve) ssaux += '(0,0)';
				}
				ss = ssaux;
			}
		}
		/********************************************************************************
		 *     		            	 F U N C:   M I R R O W   							*
		 *********************************************************************************/

		function mirrow() {
			var SSall = [];
			var Me = [];
			var Md = [];
			var Mv = [];
			var pce = 0;
			var pcd = 0;
			var pv = 0;
			var k = 0;
			for (let i = 0; i < ss.length - 1; i++) SSall[i] = ss.charAt(i);
			for (let i = 0; i < ss.length - 1; i++) {
				if (SSall[i] === '(') Me[pce++] = i;
				if (SSall[i] === ')') Md[pcd++] = i;
				if (SSall[i] === ',') Mv[pv++] = i;
			}
			for (let i = 0; i < Me.length; i++) {
				SSall[ss.length - 1 + Me[i]] = '(';
				SSall[ss.length - 1 + Md[i]] = ')';
				SSall[ss.length - 1 + Me[i] * 1 + Md[i] * 1 - Mv[i] * 1] = ',';
				k = 0;
				for (let j = Me[i] * 1 + 1; j < Mv[i]; j++) {
					k++;
					SSall[
						ss.length - 1 + Me[i] * 1 + Md[i] * 1 - Mv[i] * 1 + k
					] = SSall[j];
				}
				k = 0;
				for (let j = Mv[i] * 1 + 1; j < Md[i]; j++) {
					k++;
					SSall[ss.length - 1 + Me[i] * 1 + k] = SSall[j];
				}
			}
			ss = '';
			for (let i = 0; i < SSall.length; i++) ss += SSall[i];
		}
		/********************************************************************************
		 *     		             F U N C:   P R O P E R T I E S  						*
		 *********************************************************************************/

		function Properties() {
			if (ss.charAt(ss.length * 1 - 1) === '*') mirrow();
			if (ss.indexOf('(') !== -1) {
				if (Hmax % 2 === 0) Hmax++;
			}
			var j = 0;
			var k = 0;
			var l = 0;
			var m = 0;
			var p = 0;
			var LCurve = false;
			var LSquare = false;
			var X = false;
			for (let i = 0; i < ss.length; i++) {
				X = false;
				if (ss.charAt(i) === '(') {
					LCurve = true;
					async = true;
				}
				if (ss.charAt(i) === ',') LCurve = false;
				if (ss.charAt(i + 1) === 'x' && i < ss.length - 1) X = true;
				if (ss.charAt(i) === '[') {
					LSquare = true;
					k = l;
				}
				if (ss.charAt(i) === ']') {
					LSquare = false;
					l = k + 1;
				}
				if (
					ss.charAt(i) !== '(' &&
					ss.charAt(i) !== ',' &&
					ss.charAt(i) !== ')' &&
					ss.charAt(i) !== '[' &&
					ss.charAt(i) !== ']' &&
					ss.charAt(i) !== 'x'
				) {
					if (!LSquare) {
						if (j === 0) {
							k = -1;
						}
						Timebeat[j++] = ++k;
						l = k + 1;
					}
					if (LSquare) {
						Timebeat[j++] = l;
						k = l;
					}
					if (X && LCurve) SS[m++] = ss.charAt(i) + 'U';
					else if (X && !LCurve) SS[m++] = ss.charAt(i) + 'D';
					else SS[m++] = ss.charAt(i);
				}
			}
			for (let i = 0; i < SS.length; i++) {
				if (SS[i].charAt(0) === 'a') {
					if (SS[i].length === 1) {
						SS[i] = 10;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 11;
					} else {
						SS[i] = 9;
					}
				} else if (SS[i].charAt(0) === 'b') {
					if (SS[i].length === 1) {
						SS[i] = 11;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 12;
					} else {
						SS[i] = 10;
					}
				} else if (SS[i].charAt(0) === 'c') {
					if (SS[i].length === 1) {
						SS[i] = 12;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 13;
					} else {
						SS[i] = 11;
					}
				} else if (SS[i].charAt(0) === 'd') {
					if (SS[i].length === 1) {
						SS[i] = 13;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 14;
					} else {
						SS[i] = 12;
					}
				} else if (SS[i].charAt(0) === 'e') {
					if (SS[i].length === 1) {
						SS[i] = 14;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 15;
					} else {
						SS[i] = 13;
					}
				} else if (SS[i].charAt(0) === 'f') {
					if (SS[i].length === 1) {
						SS[i] = 15;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 16;
					} else {
						SS[i] = 14;
					}
				} else if (SS[i].charAt(0) === 'g') {
					if (SS[i].length === 1) {
						SS[i] = 16;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 17;
					} else {
						SS[i] = 15;
					}
				} else if (SS[i].charAt(0) === 'h') {
					if (SS[i].length === 1) {
						SS[i] = 17;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 18;
					} else {
						SS[i] = 16;
					}
				} else if (SS[i].charAt(0) === 'i') {
					if (SS[i].length === 1) {
						SS[i] = 18;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 19;
					} else {
						SS[i] = 17;
					}
				} else if (SS[i].charAt(0) === 'j') {
					if (SS[i].length === 1) {
						SS[i] = 19;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 20;
					} else {
						SS[i] = 18;
					}
				} else if (SS[i].charAt(0) === 'k') {
					if (SS[i].length === 1) {
						SS[i] = 20;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 21;
					} else {
						SS[i] = 19;
					}
				} else if (SS[i].charAt(0) === 'l') {
					if (SS[i].length === 1) {
						SS[i] = 21;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 22;
					} else {
						SS[i] = 20;
					}
				} else if (SS[i].charAt(0) === 'm') {
					if (SS[i].length === 1) {
						SS[i] = 22;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 23;
					} else {
						SS[i] = 21;
					}
				} else if (SS[i].charAt(0) === 'n') {
					if (SS[i].length === 1) {
						SS[i] = 23;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 24;
					} else {
						SS[i] = 22;
					}
				} else if (SS[i].charAt(0) === 'o') {
					if (SS[i].length === 1) {
						SS[i] = 24;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 25;
					} else {
						SS[i] = 23;
					}
				} else if (SS[i].charAt(0) === 'p') {
					if (SS[i].length === 1) {
						SS[i] = 25;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 26;
					} else {
						SS[i] = 24;
					}
				} else if (SS[i].charAt(0) === 'q') {
					if (SS[i].length === 1) {
						SS[i] = 26;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 27;
					} else {
						SS[i] = 25;
					}
				} else if (SS[i].charAt(0) === 'r') {
					if (SS[i].length === 1) {
						SS[i] = 27;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 28;
					} else {
						SS[i] = 26;
					}
				} else if (SS[i].charAt(0) === 's') {
					if (SS[i].length === 1) {
						SS[i] = 28;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 29;
					} else {
						SS[i] = 27;
					}
				} else if (SS[i].charAt(0) === 't') {
					if (SS[i].length === 1) {
						SS[i] = 29;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 30;
					} else {
						SS[i] = 28;
					}
				} else if (SS[i].charAt(0) === 'u') {
					if (SS[i].length === 1) {
						SS[i] = 30;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 31;
					} else {
						SS[i] = 29;
					}
				} else if (SS[i].charAt(0) === 'v') {
					if (SS[i].length === 1) {
						SS[i] = 31;
					} else if (SS[i].charAt(1) === 'U') {
						SS[i] = 32;
					} else {
						SS[i] = 30;
					}
				} else if (SS[i].length > 1 && SS[i].charAt(1) === 'U')
					SS[i] = SS[i].charAt(0) * 1 + 1;
				else if (SS[i].length > 1 && SS[i].charAt(1) === 'D')
					SS[i] = SS[i].charAt(0) * 1 - 1;
			}
			lenTime = Timebeat[Timebeat.length - 1] * 1 + 1;
			for (let j = 0; j < SS.length; j++) {
				Tbeat[p] = (SS[j] * 1 + Timebeat[p]) % lenTime;
				p++;
			}
			p = 0;
			Tbeat = Tbeat.sort(up);
			for (let i = 0; i < SS.length; i++) {
				Sum += SS[i] * 1;
			}
			Balls = Sum / lenTime;
			StatePatern();
		}

		/********************************************************************************
		 *     		             F U N C:   S T A T E P A T E R N   					*
		 *********************************************************************************/

		function StatePatern() {
			var Time = [];
			var Pos = [];
			var State = [];
			var Qtd = [];
			var j = 0;
			var k = 0;
			for (let i = 0; i < Sum * 2; i++) State[i] = '';
			for (let i = 0; i < Sum * 2; i++) {
				Time[i] =
					Timebeat[i % Timebeat.length] * 1 +
					lenTime * Math.floor(i / Timebeat.length);
				Pos[i] = Time[i] * 1 + SS[i % Timebeat.length] * 1;
				if (Time[i] === Time[i - 1] && i > 0) Qtd[k]++;
				else {
					if (i > 0) {
						k++;
					}
					Qtd[k] = 1;
				}
				State[Pos[i]] = State[Pos[i]] + '-';
				State[Time[i]] = State[Time[i]] + 'x';
			}
			k = 0;
			for (let i = 0; i < Sum * 2; i++) {
				SP[i] = 0;
				for (let j = 0; j < Qtd[i]; j++)
					if (State[i].charAt(j) === 'x') {
						SP[i]++;
						k += SP[i];
						if (k === Balls) break;
					}
			}
			var i = 0;
			while (SS[i] === 0) {
				zeros++;
				i++;
			} //count the number of zeros in the beguining
		}

		/********************************************************************************
		 *     		           F U N C:   R E A R A N G E S P A U X  					*
		 *********************************************************************************/

		function rearangeSPaux() {
			SP1copy = SP1;
			SP2copy = SP2;
			var Gap = SP1copy.length - SP2copy.length;

			if (Gap > 0) {
				LSP = SP1copy.length;
				SP1 = SP1copy;
				for (let i = 0; i < Gap; i++) SP2aux = '0,' + SP2aux;
				SP2aux = SP2aux.split(',');
			} else {
				LSP = SP2copy.length + 1;
				for (let i = 0; i < Gap * -1 + 1; i++) SP1aux = SP1aux + ',0';
				SP1aux = SP1aux.split(',');
				SP2aux = '0,' + SP2aux;
				SP2aux = SP2aux.split(',');
			}
		}

		/********************************************************************************
		 *     		       	  F U N C:   G E N E R A T E S P A U X  					*
		 *********************************************************************************/

		function generateSPaux() {
			var exit = false;
			var avance = false;
			var ind = 0;
			while (!exit) {
				avance = false;
				for (let i = 0; i < SP2copy.length; i++)
					if (SP2aux[LSP - i - 1] < SP1aux[LSP - i - 1])
						avance = true;
				if (avance) {
					SP1aux = SP1aux + ',0';
					SP1aux = SP1aux.split(',');
					SP2aux = '0,' + SP2aux;
					SP2aux = SP2aux.split(',');
					LSP++;
				} else {
					ind++;
					if (ind >= Period) {
						generateTT();
					}
					SP1aux[LSP] = 0;
					LSP = LSP + 1;
					SP2aux = '0,' + SP2aux;
					SP2aux = SP2aux.split(',');
					if (tts !== '' && ind >= Period && htOk) exit = true;
				}
			}
			ind = 0;
		}

		/********************************************************************************
		 *     		       		  F U N C:   G E N E R A T E T T  						*
		 *********************************************************************************/

		function generateTT() {
			var start = false;
			var Limit = 1;
			var i = 0;
			var u = 0;
			var v = 0;
			var Value = 0;
			var Valueref = 0;
			var Box = 0;
			SP1time = [];
			SP2time = [];
			a = [];
			b = [];
			plus = 0;

			for (let t = 0; t < SP2aux.length; t++) {
				if (SP2aux[t + zeros2] > 0) start = true;
				if (
					SP1aux[t] > SP2aux[t] ||
					(SP1aux[t] === SP2aux[t] && SP2aux[t] === 0 && !start)
				)
					a[u++] = t;
				else if (SP1aux[t] < SP2aux[t]) b[v++] = t;
			}

			v = 0;
			for (let t = 0; t < a.length; t++)
				for (u = 0; u < SP1aux[a[t]]; u++) {
					SP1time[v] = a[t];
					v++;
				}
			v = 0;
			for (let t = 0; t < b.length; t++)
				for (u = 0; u < SP2aux[b[t]] - SP1aux[b[t]]; u++) {
					SP2time[v] = b[t];
					v++;
				}

			for (let t = 0; t < b.length; t++) {
				Limit =
					Limit *
					combine(
						SP2time.length * 1 - Box * 1,
						SP2aux[b[t]] - SP1aux[b[t]]
					);
				Box += SP2aux[b[t]] - SP1aux[b[t]];
			}
			if (Limit > 5039) Limit = 5040;

			TTaux = [];
			for (let m = 0; m < Limit; m++) {
				TT = [];
				let repeated = false;
				i = 0;
				for (let t = 0; t < a.length; t++) {
					for (u = 0; u < SP1aux[a[t]]; u++) {
						if (u > 0) Valueref = SP2time[i - 1] - SP1time[i - 1];
						else Valueref = SP2time[i] - SP1time[i];
						Value = SP2time[i] - SP1time[i];
						if (Value < Valueref || Value > Hmax) {
							repeated = true;
							break;
						} else TT[i] = Value;
						i++;
					}
					if (repeated) break;
				}
				if (!repeated) {
					construct();
					//alert(tts)
					if (tts === '') break;
					if (ht12 || ht21) constructht();
					if (!htOk) break;
					if (Transitions1 && !top)
						document.forms['generateGO'].TT12.options[
							plus
						] = new Option(tts, tts);
					if (Transitions2 && !top)
						document.forms['generateGO'].TT21.options[
							plus
						] = new Option(tts, tts);
					if (!top) plus++;
				}
				getNext(SP2time, SP2time.length);
			}
		}

		/********************************************************************************
		 *     		            	F U N C:   C O N S T R U C T						*
		 *********************************************************************************/

		function construct() {
			var l = 0;
			var tt = '';
			tts = '';
			top = false;
			for (let i = 0; i < a.length; i++) {
				tt = '';
				if (SP1aux[a[i]] > 0) {
					for (let j = 0; j < SP1aux[a[i]]; j++) {
						if (async && TT[l] % 2 !== 0 && a[i] % 2 !== 0) {
							tt += convert(TT[l] * 1 + 1) + 'x';
							if (convert(TT[l] * 1 + 1) > Hmax) {
								top = true;
								break;
							}
						} else if (async && TT[l] % 2 !== 0 && a[i] % 2 === 0) {
							tt += convert(TT[l] * 1 - 1) + 'x';
						} else tt += convert(TT[l]);
						l++;
					}
					if (top) {
						break;
					}
				} else {
					tt += '0';
				}
				if (
					async &&
					a.length % 2 === 0 &&
					(a[i] + 1) % 2 !== 0 &&
					SP1aux[a[i]] > 1
				)
					tts += '([' + tt + ']';
				else if (
					async &&
					a.length % 2 === 0 &&
					(a[i] + 1) % 2 === 0 &&
					SP1aux[a[i]] > 1
				)
					tts += ',[' + tt + '])';
				else if (
					async &&
					a.length % 2 === 0 &&
					(a[i] + 1) % 2 !== 0 &&
					SP1aux[a[i]] <= 1
				)
					tts += '(' + tt;
				else if (
					async &&
					a.length % 2 === 0 &&
					(a[i] + 1) % 2 === 0 &&
					SP1aux[a[i]] <= 1
				)
					tts += ',' + tt + ')';
				else if (!async && SP1aux[a[i]] > 1) tts += '[' + tt + ']';
				else if (!async && SP1aux[a[i]] <= 1) tts += tt;
			}
		}

		/********************************************************************************
		 *     		            	F U N C:   C O N S T R U C T H T					*
		 *********************************************************************************/

		function constructht() {
			if ((Transitions1 && ht12) || (Transitions2 && ht21)) {
				let LCurve = false;
				let LSquare = false;
				ssaux = '';
				for (let i = 0; i < tts.length; i++) {
					if (
						tts.charAt(i) !== '(' &&
						tts.charAt(i) !== ',' &&
						tts.charAt(i) !== ')'
					) {
						ssaux += tts.charAt(i);
					}
				}
				tts = ssaux;
				ssaux = '';
				let count = 0;
				for (let i = 0; i < tts.length; i++) {
					aux = '';
					if (tts.charAt(i) === '[') {
						LSquare = true;
						ssaux += '[';
					} else if (tts.charAt(i) === ']') {
						LSquare = false;
						ssaux += ']';
					} else if (
						(count - 2) % 4 !== 0 &&
						(count - 1) % 4 !== 0 &&
						tts.charAt(i) !== 'x'
					) {
						if (tts.charAt(i) === '0') aux = '0';
						else if (
							tts.charAt(i) === '2' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '1x';
						else if (
							tts.charAt(i) === '2' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '1';
						else if (
							tts.charAt(i) === '4' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '2';
						else if (
							tts.charAt(i) === '4' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '2x';
						else if (
							tts.charAt(i) === '6' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '3x';
						else if (
							tts.charAt(i) === '6' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '3';
						else if (
							tts.charAt(i) === '8' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '4';
						else if (
							tts.charAt(i) === '8' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '4x';
						else if (
							tts.charAt(i) === 'a' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '5x';
						else if (
							tts.charAt(i) === 'a' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '5';
						else if (
							tts.charAt(i) === 'c' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '6';
						else if (
							tts.charAt(i) === 'c' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '6x';
						else if (
							tts.charAt(i) === 'e' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '7x';
						else if (
							tts.charAt(i) === 'e' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '7';
						else if (
							tts.charAt(i) === 'g' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '8';
						else if (
							tts.charAt(i) === 'g' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '8x';
						else if (
							tts.charAt(i) === 'i' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = '9x';
						else if (
							tts.charAt(i) === 'i' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = '9';
						else if (
							tts.charAt(i) === 'k' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'a';
						else if (
							tts.charAt(i) === 'k' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'ax';
						else if (
							tts.charAt(i) === 'm' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'bx';
						else if (
							tts.charAt(i) === 'm' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'b';
						else if (
							tts.charAt(i) === 'o' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'c';
						else if (
							tts.charAt(i) === 'o' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'cx';
						else if (
							tts.charAt(i) === 'q' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'dx';
						else if (
							tts.charAt(i) === 'q' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'd';
						else if (
							tts.charAt(i) === 's' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'e';
						else if (
							tts.charAt(i) === 's' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'ex';
						else if (
							tts.charAt(i) === 'u' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'fx';
						else if (
							tts.charAt(i) === 'u' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'f';
						else if (
							tts.charAt(i) === 'w' &&
							tts.charAt(i + 1) !== 'x'
						)
							aux = 'g';
						else if (
							tts.charAt(i) === 'w' &&
							tts.charAt(i + 1) === 'x'
						)
							aux = 'gx';
						ssaux += aux;
					}
					if (!LSquare && tts.charAt(i) !== 'x') count++;
				}
				tts = ssaux;
			}
			if ((Transitions1 && ht21) || (Transitions2 && ht12)) {
				let LCurve = false;
				let LSquare = false;
				ssaux = '';
				let count = 0;
				for (let i = 0; i < tts.length; i++) {
					if (tts.charAt(i) === '(') count++;
				}
				if (a.length % 4 !== 0) {
					htOk = false;
				} else htOk = true;

				if (htOk) {
					ssaux = '';
					count = 0;
					for (let i = 0; i < tts.length; i++) {
						if (tts.charAt(i) === '(') count++;
						if (count % 2 !== 0) ssaux += tts.charAt(i);
					}
					tts = ssaux;
					ssaux = '';
					for (let i = 0; i < tts.length; i++) {
						aux = '';
						if (tts.charAt(i) === '(') {
							ssaux += '(';
						} else if (tts.charAt(i) === ',') {
							ssaux += ',';
						} else if (tts.charAt(i) === ')') {
							ssaux += ')';
						} else if (tts.charAt(i) === '[') {
							LSquare = true;
							ssaux += '[';
						} else if (tts.charAt(i) === ']') {
							LSquare = false;
							ssaux += ']';
						} else if (tts.charAt(i) !== 'x') {
							if (tts.charAt(i) === '0') aux = '0';
							else if (
								tts.charAt(i) === '2' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '1x';
							else if (
								tts.charAt(i) === '2' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '1';
							else if (
								tts.charAt(i) === '4' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '2';
							else if (
								tts.charAt(i) === '4' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '2x';
							else if (
								tts.charAt(i) === '6' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '3x';
							else if (
								tts.charAt(i) === '6' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '3';
							else if (
								tts.charAt(i) === '8' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '4';
							else if (
								tts.charAt(i) === '8' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '4x';
							else if (
								tts.charAt(i) === 'a' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '5x';
							else if (
								tts.charAt(i) === 'a' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '5';
							else if (
								tts.charAt(i) === 'c' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '6';
							else if (
								tts.charAt(i) === 'c' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '6x';
							else if (
								tts.charAt(i) === 'e' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '7x';
							else if (
								tts.charAt(i) === 'e' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '7';
							else if (
								tts.charAt(i) === 'g' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '8';
							else if (
								tts.charAt(i) === 'g' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '8x';
							else if (
								tts.charAt(i) === 'i' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = '9x';
							else if (
								tts.charAt(i) === 'i' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = '9';
							else if (
								tts.charAt(i) === 'k' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'a';
							else if (
								tts.charAt(i) === 'k' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'ax';
							else if (
								tts.charAt(i) === 'm' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'bx';
							else if (
								tts.charAt(i) === 'm' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'b';
							else if (
								tts.charAt(i) === 'o' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'c';
							else if (
								tts.charAt(i) === 'o' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'cx';
							else if (
								tts.charAt(i) === 'q' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'dx';
							else if (
								tts.charAt(i) === 'q' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'd';
							else if (
								tts.charAt(i) === 's' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'e';
							else if (
								tts.charAt(i) === 's' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'ex';
							else if (
								tts.charAt(i) === 'u' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'fx';
							else if (
								tts.charAt(i) === 'u' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'f';
							else if (
								tts.charAt(i) === 'w' &&
								tts.charAt(i + 1) !== 'x'
							)
								aux = 'g';
							else if (
								tts.charAt(i) === 'w' &&
								tts.charAt(i + 1) === 'x'
							)
								aux = 'gx';
							ssaux += aux;
						}
					}
					tts = ssaux;
				}
			}
		}

		/********************************************************************************
		 *     		            	 F U N C:   G E T N E X T  							*
		 *********************************************************************************/

		function getNext(CH, N) {
			var aux = 0;
			var f = N - 1;
			var g = N;
			aux = 0;
			f = N - 1;
			while (CH[f - 1] >= CH[f]) f--;
			g = N;
			while (CH[g - 1] <= CH[f - 1]) g--;
			aux = CH[f - 1] * 1;
			CH[f - 1] = CH[g - 1] * 1;
			CH[g - 1] = aux * 1;
			f++;
			g = N;
			while (f < g) {
				aux = CH[f - 1] * 1;
				CH[f - 1] = CH[g - 1] * 1;
				CH[g - 1] = aux * 1;
				f++;
				g--;
			}
			return CH;
		}

		/********************************************************************************
		 *     		            	 F U N C:   C O N V E R T   						*
		 *********************************************************************************/

		function convert(aux) {
			if (aux === 10) aux = 'a';
			if (aux === 11) aux = 'b';
			if (aux === 12) aux = 'c';
			if (aux === 13) aux = 'd';
			if (aux === 14) aux = 'e';
			if (aux === 15) aux = 'f';
			if (aux === 16) aux = 'g';
			if (aux === 17) aux = 'h';
			if (aux === 18) aux = 'i';
			if (aux === 19) aux = 'j';
			if (aux === 20) aux = 'k';
			if (aux === 21) aux = 'l';
			if (aux === 22) aux = 'm';
			if (aux === 23) aux = 'n';
			if (aux === 24) aux = 'o';
			if (aux === 25) aux = 'p';
			if (aux === 26) aux = 'q';
			if (aux === 27) aux = 'r';
			if (aux === 28) aux = 's';
			if (aux === 29) aux = 't';
			if (aux === 30) aux = 'u';
			if (aux === 31) aux = 'v';
			if (aux === 32) aux = 'w';
			return aux;
		}

		/********************************************************************************
		 *     		            	 F U N C:   C O M B I N A T I O N 					*
		 *********************************************************************************/

		function combine(N, p) {
			var fact = factorial(N) / (factorial(N - p) * factorial(p));
			return fact;
		}

		/********************************************************************************
		 *     		            	 F U N C:   F A C T O R I A L 						*
		 *********************************************************************************/

		function factorial(val) {
			var fact = 1;
			if (val === 0) fact = 1;
			else {
				for (let h = 1; h < val + 1; h++) {
					fact = fact * h;
				}
			}
			return fact;
		}

		/********************************************************************************
		 *     		            		 F U N C:   U P   								*
		 *********************************************************************************/
		function up(x, y) {
			return x < y ? -1 : x > y ? 1 : 0;
		}

		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
		// END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END END
	};

	return (
		<div className='card'>
			<div className='card-body'>
				<h3 className='text-center'>Transition Generator</h3>
				{error && <div className='alert alert-danger'>{error}</div>}
				<div className='row'>
					<div className='col-12 col-md-6'>
						<form onSubmit={generate}>
							<div className='form-group'>
								<label htmlFor='ss1'>Siteswap #1</label>
								<input
									type='text'
									name='ss1'
									id='ss1Input'
									className='form-control'
									value={ss1}
									onChange={e => {
										setSs1(e.target.value);
									}}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='ss2'>Siteswap #2</label>
								<input
									type='text'
									name='ss2'
									id='ss2Input'
									className='form-control'
									value={ss2}
									onChange={e => {
										setSs2(e.target.value);
									}}
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='period1'>
									Transition #1 Length
								</label>
								<select
									name='period1'
									id='period1Select'
									className='custom-select'
									value={transPeriod1}
									onChange={e => {
										setTransPeriod1(e.target.value);
									}}
								>
									<option value={0}>Lowest Period</option>
									{new Array(7)
										.fill(undefined)
										.map((value, i) => (
											<option
												key={
													'Lowest period + ' + (i + 1)
												}
												value={i + 1}
											>
												Lowest Period + {i + 1}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='period2'>
									Transition #2 Length
								</label>
								<select
									name='period2'
									id='period2Select'
									className='custom-select'
									value={transPeriod2}
									onChange={e => {
										setTransPeriod2(e.target.value);
									}}
								>
									<option value={0}>Lowest Period</option>
									{new Array(7)
										.fill(undefined)
										.map((value, i) => (
											<option value={i + 1}>
												Lowest Period + {i + 1}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='maxH1'>Max Height #1</label>
								<select
									name='maxH1'
									id='maxH1Select'
									className='custom-select'
									value={maxH1}
									onChange={e => {
										setMaxH1(e.target.value);
									}}
								>
									<option value={0}>No Max</option>
									{'3456789abcdefghijklmnopqrstuv'
										.split('')
										.map((value, i) => (
											<option value={value}>
												{value}
											</option>
										))}
								</select>
							</div>
							<div className='form-group'>
								<label htmlFor='maxH2'>Max Height #2</label>
								<select
									name='maxH2'
									id='maxH2Select'
									className='custom-select'
									value={maxH2}
									onChange={e => {
										setMaxH2(e.target.value);
									}}
								>
									<option value={0}>No Max</option>
									{'3456789abcdefghijklmnopqrstuv'
										.split('')
										.map((value, i) => (
											<option value={value}>
												{value}
											</option>
										))}
								</select>
							</div>
							<button type='submit' className='btn btn-submit'>
								Generate
							</button>
						</form>
					</div>
					<div className='col-6'></div>
				</div>
			</div>
		</div>
	);
};

export default TransitionGenerator;

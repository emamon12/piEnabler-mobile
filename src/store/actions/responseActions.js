export const getResponses = fbase => (dispatch, setState, {getFirestore}) => {
	const fireStore = getFirestore();
	const responses = fbase.sliceId;
	const sess = fbase.sessionId;
	const place;
	var aCount, bCount, cCount, dCount;
	
	place = fireStore.collection('sliceResponses').doc('${responses}${sess}');
	
	aCount = fbase.numberOfA;
	bCount = fbase.numberOfB;
	cCount = fbase.numberOfC;
	dCount = fbase.numberOfD;
	
	let observer = place.onSnapshot(docSnapshot => {
		console.log("A: " + aCount + '\n');
		console.log("B: " + bCount + '\n');
		console.log("C: " + cCount + '\n');
		console.log("D: " + dCount + '\n');
	}, err => {
  console.log('Encountered error: ${err}');
});
}


export const updateResponses = fbase => (dispatch, getState, {getFirestore}) => {
	const fireStore = getFirestore();
	const sess = fbase.session;
	const sessId = fbase.sessionId;
	const response = fbase.uAnswer;
	const numA = fbase.numberOfA;
	const numB = fbase.numberOfB;
	const numC = fbase.numberOfC;
	const numD = fbase.numberOfD;
	const totalResp = fbase.totalResponses;
	
	if(response == 'A') {
			numA++;
	}
	else if(response == 'B') {
			numB++;
	}
	else if(response == 'C') {
			numC++;
	} else {
			numD++;
	}
	
	totalResp++;
	
fireStore.collection('sliceResponses').doc('${sessId}${sess.currentSliceId}').update({
	numberOfA: numA,
	numberOfB: numB,
	numberofC: numC,
	numberOfD: numD,
	totalResponses: totalResp
});
}

/*function getOptions(data) {
  sliceInfo = data.val();

  isLecture = sliceInfo.Lecture;

  if (isLecture == false) {
    answer1 = sliceInfo.Answer1;
    answer2 = sliceInfo.Answer2;
    answer3 = sliceInfo.Answer3;
    answer4 = sliceInfo.Answer4;
    correctAnswer = sliceInfo.correctAnswer;
  } else {
    answer1 = "";
    answer2 = "";
    answer3 = "";
    answer4 = "";
    correctAnswer = "";
  }

  document.getElementById("answer1").innerHTML = answer1;
  document.getElementById("answer2").innerHTML = answer2;
  document.getElementById("answer3").innerHTML = answer3;
  document.getElementById("answer4").innerHTML = answer4;
}*/

export const LoadQuestions = classs => (dispatch, getState, {getFirestore}) => {
	const fireStore = getFirestore();
	const collection = classs.classId;
	const sliceToLoad = classs.sliceToLoad;
  var answer1, answer2, answer3, answer4, correctAnswer;
  var show1, show2, show3, show4;

  show1 =  document.getElementById("answer1");
  show2 =  document.getElementById("answer2");
  show3 =  document.getElementById("answer3");
  show4 =  document.getElementById("answer4");

  correctAnswer = classs.CorrectAnswer;
	
	if(classs.isLecture == false) {
		answer1 = classs.Answer1;
		answer2 = classs.Answer2;
		answer3 = classs.Answer3;
		answer4 = classs.Answer4;
	} else {
	  answer1 = "";
		answer2 = "";
		answer3 = "";
		answer4 = "";
		correctAnswer = "";
  }
  
  if(correctAnswer == answer1) {
    show1.innerHTML = answer1.bold();
    show2.innerHTML = answer2;
    show3.innerHTML = answer3;
    show4.innerHTML = answer4;
  } 
  else if(correctAnswer == answer2) {
    show1.innerHTML = answer1;
    show2.innerHTML = answer2.bold();
    show3.innerHTML = answer3;
    show4.innerHTML = answer4;
  }
  else if(correctAnswer == answer3) {
    show1.innerHTML = answer1;
    show2.innerHTML = answer2;
    show3.innerHTML = answer3.bold();
    show4.innerHTML = answer4;
  } else {
    show1.innerHTML = answer1;
    show2.innerHTML = answer2;
    show3.innerHTML = answer3;
    show4.innerHTML = answer4.bold();
  }
}

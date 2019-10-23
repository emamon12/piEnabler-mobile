const db = firestore.database();
var classesReference = firebase.database().ref("Classes/");
var studentRef = firebase.database().ref("users/");
var answerRef = firebase.database().ref("responses/");
var sliceRef = firebase.database().ref("slices/");
var answer1, answer2, answer3, answer4, correctAnswer, isLecture;
var sliceInfo;

function sendResponseToDB(studentId, response, timesPolled, session, slice) {
  //Check both methods
  var studentRef = db.ref("piesiue/responses/" + studentId);
  var docName = "test" + session;

  let data = {
    currSession: session,
    currSlice: slice,
    response: response,
    studentId: studentId,
    timesPolled: timesPolled
  };

  let setDoc = db
    .collection("piesiue/responses")
    .doc(docName)
    .set(data);

  //timesPolled++;
  //newResponse = studentRef.response + "," + newResponse;

  //firebase.database().ref(studentRef).set({
  //	response: newResponse,
  //	timesPolled: timesPolled,
  //});
}



function pollSliceInfo(response, sliceId, sessionId, studentId) {
  var sliceRef = db.ref("piesiue/slices/" + sliceId);
  var responseRef = db.ref("piesiue/sliceResponses/");
  var a1, a2, a3, a4, numA, numB, numC, numD, totalResponses;
  var docId = sliceId + sessionId;

  a1 = sliceRef.answer1;
  a2 = sliceRef.answer2;
  a3 = sliceRef.answer3;
  a4 = sliceRef.answer4;
  numA = sliceRef.numA;
  numB = sliceRef.numB;
  numC = sliceRef.numC;
  numD = sliceRef.numD;
  totalResponses = sliceRef.totalResponces;

  if (response == a1) {
    numA++;
  } else if (response == a2) {
    numB++;
  } else if (response == a3) {
    numC++;
  } else {
    numD++;
  }

  totalResponses++;

  let data = {
    numberOfA: numA,
    numberOfB: numB,
    numberOfC: numC,
    numberOfD: numD,
    totalResponces: totalResponses
  };

  sliceRef.update(data);
  //db.collection('piesiue/sliceResponses/9MqKqnynbnOqzkYp38sn').set(data);
}

function getInfoForHistogram() {
  // var sessionRef = db.ref('piesiue/session');
  var sliceRef = db.ref("piesiue/slices");
  var aCount, bCount, cCount, dCount;

  aCount = sliceRef.numberOfA;
  bCount = sliceRef.numberOfB;
  cCount = sliceRef.numberOfC;
  dCount = sliceRef.numberOfD;

  Console.log("A: " + aCount);
  Console.log("B: " + bCount);
  Console.log("C: " + cCount);
  Console.log("D: " + dCount);
}

function getOptions(data) {
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
}

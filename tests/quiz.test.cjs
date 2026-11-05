const test = require('node:test');
const assert = require('node:assert/strict');
const quiz = require('../dist/quiz-core.js');
test('question bank has unique IDs, valid answers, explanations and HTTPS references',()=>{
 assert.equal(quiz.questions.length,24);assert.equal(new Set(quiz.questions.map(q=>q.id)).size,24);
 for(const q of quiz.questions){assert.equal(q.options.length,4);assert(q.correct>=0&&q.correct<4);assert(q.explanation.length>20);assert(q.source.startsWith('https://'));}
});
test('every filter produces a playable mission without duplicate questions',()=>{
 for(const topic of ['all','devops','cloud','platform'])for(const difficulty of ['all','foundation','advanced']){
 const list=quiz.select(topic,difficulty);assert(list.length>=4&&list.length<=5);assert.equal(new Set(list.map(q=>q.id)).size,list.length);
 assert(list.every(q=>(topic==='all'||q.topic===topic)&&(difficulty==='all'||q.difficulty===difficulty)));
 }
});
test('answers cannot be submitted twice or advanced before answering',()=>{
 const g=quiz.create(quiz.select());assert.equal(quiz.next(g),false);assert.equal(quiz.answer(g,-1),false);
 assert.equal(quiz.answer(g,g.questions[0].correct),true);assert.equal(g.score,100);
 assert.equal(quiz.answer(g,g.questions[0].correct),false);assert.equal(g.score,100);
});
test('five correct answers finish with 750 XP and further actions cannot award points',()=>{
 const g=quiz.create(quiz.select());for(const q of g.questions){quiz.answer(g,q.correct);quiz.next(g);}
 assert.equal(g.finished,true);assert.deepEqual(quiz.summarize(g),{correct:5,total:5,score:750,bestStreak:5});
 assert.equal(quiz.answer(g,0),false);assert.equal(quiz.next(g),false);assert.equal(g.score,750);
});
test('incorrect answer resets the streak without ending the mission',()=>{
 const g=quiz.create(quiz.select());quiz.answer(g,g.questions[0].correct);quiz.next(g);
 quiz.answer(g,(g.questions[1].correct+1)%4);quiz.next(g);assert.equal(g.streak,0);assert.equal(g.finished,false);
 quiz.answer(g,g.questions[2].correct);assert.equal(g.score,200);assert.equal(g.bestStreak,1);
});

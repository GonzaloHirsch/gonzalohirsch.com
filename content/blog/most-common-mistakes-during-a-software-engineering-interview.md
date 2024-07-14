---
dqid: 'most-common-mistakes-during-a-software-engineering-interview'
title: 'Most Commom Mistakes During a Software Engineering Interview'
description: "After interviewing software engineers over the past months, I focused on the main mistakes I've seen people make during the software engineer interview."
headline: 'Most Commom Mistakes During a Software Engineering Interview'
excerpt: "After interviewing software engineers over the past months, I focused on the main mistakes I've seen people make during the software engineer interview."
date: '2024-07-14T12:00:00'
dateUpdated: ''
author: 'Gonzalo Hirsch'
authorUrl: 'https://www.linkedin.com/in/gonzalo-hirsch/'
socialImage:
  src: '/img/blog--most-common-mistakes-during-a-software-engineering-interview.webp'
  mime: 'webp'
  alt: 'Illustration with the text "Most Commom Mistakes During a Software Engineering Interview"'
  width: 1200
  height: 630
faq:
  - question: 'How do I structure a solution design document?'
    answer: "Since we are working with an offline problem, we have higher expectations. Your system design should have the following sections in order: Problem Statement, Assumptions, Requirements & Scope, Functional Requirements, Non-Functional Requirements, High-Level Design, Architectural Analysis, and Potential Limitations. It's a common mistake to start thinking about the entire solution and write the document later. It should be the other way around. Start by working on the document up until the non-functional requirements. If you do this without thinking about the solution, your solution is halfway there. This process showcases your software development skills since it follows the software development lifecycle process."
  - question: 'How can I impress the interviewer?'
    answer: "The first step is to be honest and convey your entire thought process. As an interviewer, I'm not interested in you knowing every aspect of the stack. If you do, that's great, but I care about how you think. Your thought process and your ideas are what is worth it for us. The next step is to answer the interview questions that we ask. It doesn't have to be concise, but it's annoying as an interviewer asking everything three times for a straightforward response. Don't try to evade topics by giving out tangential software engineer answers. If you don't know how to answer or don't understand the interview questions, just be honest and say that."
---

::inlineQuote
This blog post was sent as part of the [newsletter](/#signup) to all subscribers on June 15th, 2024. To receive the latest extra content, consider subscribing to the newsletter.
::

This month, I'm touching on one of the topics we discussed in the [digest from February](/blog/software-engineer-interview-tips-and-tricks/). That topic is the feared software engineering interview. Instead of focusing on preparation, I'll focus on some takeaways that I've seen from interviewing software engineers over the past two or three months.

I'll focus on the main mistakes I've seen people make during the software engineer interview. Those mistakes are why we didn't make an offer to them. Read it if you are about to go through the software engineer interview process. It can save you from making fatal mistakes in the process.

## Context

At Croud, we are [hiring for a Senior Software Engineer](https://www.linkedin.com/posts/gonzalo-hirsch_senior-software-engineer-croud-activity-7190999636344483840-3EIq), and I'm leading that hiring process for the role. We've been going through that process for a couple of months but have been unable to find software engineers suitable for the role. Having never been in a structured software engineering interview process before from the interviewer's side, I got a lot of insights from the other side of the table. I want to share the main mistakes that cost candidates their shot at the job.

I'll approach this in the order in which the process goes:

1. CV Review
2. Initial Interview
3. Offline System Design Task
4. Final Interview

We don't have a coding interview as part of the technical interview since a significant aspect of the role is architecture design, so we have the system design interview.

## CV Review

The first step in the interview process is the candidate's application. In most cases, this is using a CV and a cover letter. It is the first area that causes problems for software engineering candidates.

The principal material we are looking for at this stage is the software engineer's CV.

::inlineQuote
**Mistake #1**. Using unreadable CV formats. I've seen all sorts of CVs over the past months. Some were great, but most of them were awful. The main problem is that those CVs are utterly unreadable by another person. A decent CV should not have overlapping text, rendering text not visible. Don't have formatting, fonts, and spacing that make it difficult to read the text.
::

As part of the interview process, I reviewed CVs as they came into our system. You need to understand that if engineers (like me) are reviewing the CV, we'll spend no more than two or three minutes reading your CV. If your resume is hard to read, I won't spend time trying to understand it. I won't read it since I have other important work to tackle.

::inlineQuote
**Mistake #2**. Having resumes that are several pages long. The main culprit of long CVs are formats with sidebars that cover one-third of the page, ending up as blank columns after the first page. Other culprits are improper spacing and many long bullet points. Keep it short, have only the relevant information, and experiment with different formats. Sometimes, "uglier" formats are far more efficient.
::

::inlineQuote
**Mistake #3**. Having non-action and non-impact bullet points. Mentioning in your CV that you "Solved bugs and implemented features" is irrelevant. As an interviewer, I'm assuming that part of your job included that and that you did your job correctly. I want to see how impactful your work is and not your tasks.
::

Overall, it's an initial type of filter on how candidates can fill in simple forms and how they present themselves on paper. CV comes first, then cover letters.

::inlineQuote
**Mistake #4**. Not prioritizing the correct application material. A great CV should be enough. It doesn't need a cover letter. Ensure you have a great CV. Once you covered that, move into enhancements like a cover letter. It's awful seeing a bad CV. You've already started with one foot out of the main door.
::

For CV tips, I highly recommend looking at [Wonsulting](https://www.wonsulting.com/). They have a fantastic newsletter with tips about interviews and software engineer CVs.

The next step in the process is having an initial interview with the candidate. It is where you start looking at software engineer interview questions.

## Initial Interview

This initial behavioral interview evaluates the hard and soft skills of software engineer candidates who apply. We need to check if you have the skills you say you do in your CV and how true that is.

We also look for hints that you could thrive in the work environment and how extensive your software development experience is.

Interviews begin with some quick chats and an interview question about the company.

::inlineQuote
**Mistake #5**. Not showing enough interest. It's evident when candidates do not care. That puts you off as an interviewer and doesn't give us a good impression.
::

::inlineQuote
**Mistake #6**. Not doing at least minimal research about the company. We ask people what they know about the company to see if they care enough to try to understand us. We often find that candidates don't even do a bit of research about us apart from reading the job description. This lack of research exposes itself when they make assumptions about how the business or teams operate.
::

After those initial interview questions, we move into more resume-focused interview questions about the specific points listed in the CV. Some interview questions cover technologies, cloud providers, and best practices. I want to see that you are a good fit for the team and the stack.

Depending on the seniority, we may expect more or less knowledge of the topics we are discussing.

::inlineQuote
**Mistake #7**. Not knowing details about the points mentioned on the resume. Some candidates include many technologies and achievements in their resumes, but when asked about them, they know no details. That's ok for non-current roles, but it's not acceptable for recent experience. That is a huge red flag for us since I don't believe you did that or had the involvement you claim to have had.
::

::inlineQuote
**Mistake #8**. Discussing personal projects interchangeably with commercial experience. Although some personal software developer projects can be significant, they are not under the same scrutiny as commercial experience. Refer first to the commercial experience and then to vanity projects, but clarify which ones you are referring to.
::

Software developer candidates struggle with technical questions about the stacks they are managing. For example, if you mention using Terraform, you should know the basics of state management. If you discuss the cloud, understand how to interact with the provider you mention (SDKs, CLIs, IaC). It goes back to one of the previous mistakes above. Interview questions don't attack you but give you space to showcase your knowledge.

::inlineQuote
**Mistake #9**. Lying about the level of expertise in specific technologies in the CV. Since I'm someone technical asking interview questions about the stack, I know how those work. We will ask about the technologies we use and maybe know but not use. It's often transparent when candidates lie or exaggerate their experience with those technologies in their resume, which generally means a game over for their application.
::

After doing well at this stage, next comes an offline system design task. It is the part where the least number of software developer candidates have been successful. Continue reading to see the main mistakes here.

## Offline System Design Task

This task evaluates the technical skills that the candidate has mentioned. It is helpful because a system design doesn't mean the same thing for you and me. I want to see how thorough you are and how you think.

Candidates should design a system and return that design and all the explanations to us. We expect to see their best work, given that they have a time limit of 1 week to do it. We pre-evaluate the task before giving them a final interview, which is something they are aware of.

::inlineQuote
**Mistake #10**. Not handing over all the material. We've had software engineer candidates hand over part of the material for us to pre-evaluate and then complain that we rejected them based on the delivered material. It's natural that if we don't see something acceptable, we reject it, so why not hand in all your work?
::

::inlineQuote
**Mistake #11**. Handing over material in a non-standard format. I've received PPTXs, Draw.io files, Excalidraw files, and huge PNGs with nearly unreadable text, among others. It is infuriating when candidates cannot send a clear PDF that doesn't require me to set up an account in a new service. It circles back to how much they care, their ways of working, and other notions of clarity.
::

After getting the material and trying to read it, we attempt to understand it. We don't look for a specific pattern or components but something that makes sense and could work in theory.

We emphasize that we want their technology choices, assumptions, and reasoning as to why they picked components.

::inlineQuote
**Mistake #12**. Not having a clear structure in their responses. Out of dozens of software engineer candidates, only one or two have given us a document with proper structure. The rest have given us unstructured responses with unclear data. An ideal response is a document (PDF) with a structured approach. For example, from higher to lower levels, detailing each component afterward.
::

::inlineQuote
**Mistake #13**. Handing in a technology vomit. Multiple software engineer candidates hand in a list of technologies, for example, saying that, for CICD, they can use any platform. We'd like to see which platforms they feel comfortable with and how and why they would specifically use those. I can get a list of examples from Google, so there's no value in that part of the response unless they add their knowledge.
::

Overall, we care about how they contribute with their knowledge to the solution. We are not interested in the most optimal solution in the world but in seeing how they think and can transmit their thoughts in a solution document. We expect them to convey their ideas clearly and with a rationale behind them.

After receiving and quickly evaluating this task, we invite people for a final interview to discuss the results.

## Final Interview

This final interview is one of the most important since it determines whether or not we hire them. In this interview, we gather people from different backgrounds and places around the company, which gives us different perspectives on a person and the technologies.

During this step, we expect candidates to be able to defend their technology choices and stand by them. We may also give them scenarios to see how they would react or their infrastructure would change given that change of plans.

::inlineQuote
**Mistake #14**. Not doing enough research. Usually, candidates don't do enough research about the problem. We give them cues as to which services the solution integrates but do next to no research on how those services integrate or the formats. Some quick research that takes at most 30 minutes would reveal that clearly, but the payoff is considerably higher. Doing that research would show us how much they care about the interview and the role.
::

A big part of the interview is asking them how specific components work. It is an issue for multiple candidates who cannot defend their choices. It's ok if they don't have enough experience in portions of the stack, but it's relevant that they don't try to fool us by saying that they know something and end up not showing that during the interview.

::inlineQuote
**Mistake #15**. Mentioning technologies they don't feel comfortable discussing. It's ok that candidates may not have enough hands-on experience working with a specific component of the solution, but it's not acceptable for them to fake that knowledge. Being in a room with multiple, highly technical people is a poor move to lie.
::

If I were to be the one in the interview, I would recommend being upfront if you are unfamiliar with a portion of it. You can mention that you did some shallow research on it but don't have enough experience to discuss that aspect of the solution confidently at this point. It would put us, as interviewers, in a position where we would ask you how you think that component works, giving you the space to showcase some of your thought processes.

As a takeaway from this last portion, I want to highlight the importance of the thought process and communicating thoughts.

## How to structure a solution design document

As the person running your software engineering interview, I've solved multiple system design tasks. There are two types of system design problems: offline and real-time. If we discuss a real-time problem, we are considerably more lenient in the responses we expect from candidates. Since we are working with an offline problem, we have higher expectations. I'm here to give you a quick rundown for a better structure for your solution design response.

Your system design should have the following sections in order:

1. **Problem Statement**: In this section, you should briefly outline the problem.
2. **Assumptions**: List all your assumptions, including a brief description as to why you made that assumption. You can number them to use as quick references throughout the document.
3. **Requirements & Scope**: Translate the task into the requirements for your system. Listing requirements showcase your skill to translate vague or long descriptions into digestible functionalities that you or someone else can go ahead and implement. Define the scope. It could be how many users, how much data, and how frequently something comes up. Doing this will help you set the stage to anticipate any interview questions that cover scalability.
4. **Functional Requirements**: Functional requirements come from the requirements you discussed before. Functional requirements are essentially what your system should do. For example, your application should generate a human-readable report in CSV format. Outlining the functional requirements helps you start defining the components your solution has.
5. **Non-Functional Requirements**: Non-functional requirements, as the functional ones, come from the requirements and problem description sections. Non-functional requirements are essentially how your system should do what you defined as functional requirements. For example, the system should process files at 10 per minute.
6. **High-Level Design**: Defining both types of requirements helps you set constraints in the solution but already guides you in starting to solve the problem since it can eliminate some potential solutions that don't fit some of the requirements you defined. In this section, you define a high-level, component-based architectural design. You can also do a data flow design, outlining how the data will flow through the system you are solving for. Look for the mistakes listed above, but the diagram should be clear.
7. **Architectural Analysis**: This section should contain most of the content in the document. You should discuss all the components and technologies in your system. The idea is that you can say WHAT piece of technology you would use, HOW you would use it, and WHY you are using it. These descriptions help you convey your thought process and expertise. Use them to shine and showcase your best work.
8. **Potential Limitations**: This last section showcases your skill to be analytical about your designs and put them to the test. Be critical and attempt to identify any potential inefficiencies or problems so that you can either anticipate interview questions or come through as possessing good analytical skills. You don't have to tear apart your design, but pointing out limitations is a good practice.

It's a common mistake to start thinking about the entire solution and write the document later. It should be the other way around. Start by working on the document up until the non-functional requirements. If you do this without thinking about the solution, your solution is halfway there. This process showcases your software development skills since it follows the software development lifecycle process.

Using this structure, you will impress any interviewer or software engineer who gets in your way.

## How to impress your interviewer

Impressing your interviewer should be the very least you should aim for. The first step is to be honest and convey your entire thought process. As an interviewer, I'm not interested in you knowing every aspect of the stack. If you do, that's great, but I care about how you think. Your thought process and your ideas are what is worth it for us. If you don't convey that, you fall into the same pool as the other candidates. If you do otherwise, you stand out and are already a step ahead.

The next step is to answer the interview questions that we ask. It doesn't have to be concise, but it's annoying as an interviewer asking everything three times for a straightforward response. Don't try to evade topics by giving out tangential software engineer answers. If you don't know how to answer or don't understand the interview questions, just be honest and say that. We can work together on a response or change the interview questions.

The behavioral interview, the first software engineer interview, can be finished quicker if candidates impress you. I've had interviews with impressive candidates that last for half the time than with candidates that are not promising. It is this way because they follow these best practices.

## Back to Basics

Expand each FAQ to finish comprehending the basics and cement your knowledge for future reference.

::basicExpand{heading="How do I structure a solution design document?" componentType="h3"}
#description
Since we are working with an offline problem, we have higher expectations. Your system design should have the following sections in order: Problem Statement, Assumptions, Requirements & Scope, Functional Requirements, Non-Functional Requirements, High-Level Design, Architectural Analysis, and Potential Limitations. It's a common mistake to start thinking about the entire solution and write the document later. It should be the other way around. Start by working on the document up until the non-functional requirements. If you do this without thinking about the solution, your solution is halfway there. This process showcases your software development skills since it follows the software development lifecycle process.
::

::basicExpand{heading="How can I impress the interviewer?" componentType="h3"}
#description
The first step is to be honest and convey your entire thought process. As an interviewer, I'm not interested in you knowing every aspect of the stack. If you do, that's great, but I care about how you think. Your thought process and your ideas are what is worth it for us. The next step is to answer the interview questions that we ask. It doesn't have to be concise, but it's annoying as an interviewer asking everything three times for a straightforward response. Don't try to evade topics by giving out tangential software engineer answers. If you don't know how to answer or don't understand the interview questions, just be honest and say that.
::
::

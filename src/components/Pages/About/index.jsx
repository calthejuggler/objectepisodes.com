import React from 'react';

const About = () => {
	return (
		<div className='container'>
			<div className='row align-items-center'>
				<div className='col-12 text-center'>
					<h1 className='card-title'>What is this place?</h1>
					<p className='card-text lead'>
						<i>
							<a href='#/'>Object Episodes</a> is the #1 online
							portal for jugglers worldwide.
							<hr />
						</i>
					</p>
				</div>
				<div className='col-12 col-lg-8'>
					<h2 className='text-center'>The History</h2>
					<p className='card-text'>
						Jay Gilligan started the website at some point which
						jugglers used his discourse forum to have discussions
						about juggling.
					</p>
					<p className='card-text'>
						In 2018, Jay Gilligan and Emil Dahl gave Cal Courtney
						incentive to program the site; Combining his love for
						juggling with his love for programming to create
						something that would work well for everybody.
					</p>
					<p className='card-text'>
						Unfortunately, Cal was very busy at circus school and
						the exciting talks went no further. The site had been
						made, but nobody had the time to maintain it online.
					</p>
					<p className='card-text'>
						Cut to {new Date().getFullYear()} and we have come so
						far! When the website was originally designed, it was
						made with pure CSS and PHP. Both, incredibly powerful
						programming languages, but they are not streamlined with
						today's online standards. The site is now made fully
						with ReactJS, a Javascript framework that allows us to
						update the site more easily and to open it up to the
						public. <b>Long story short...</b> It's shiny, new and
						badass.
					</p>
				</div>
				<div className='col-12 col-lg-4'>
					<h2 className='text-center'>Are you a programmer?</h2>
					<p className='card-text'>
						If you wish to have a look at the code and play around
						with it yourself, you can create your own branch of it
						and submit pull requests to the{' '}
						<a href='https://www.github.com/calthejuggler/objectepisodes.com'>
							GitHub Repo
						</a>
						.
					</p>
				</div>
				<div className='col-12'>
					<h2 className='text-center'>Who are You Guys?</h2>
					<p>
						Cal Jay and Emil.Veniam nisi ullamco incididunt culpa
						proident esse elit nisi Lorem. Reprehenderit nostrud
						commodo tempor commodo. Fugiat irure excepteur officia
						ullamco nisi ea excepteur velit fugiat. Occaecat velit
						ex aute anim duis aliqua velit reprehenderit tempor
						irure commodo sit amet velit. Labore aute culpa
						excepteur dolor dolor anim et fugiat labore consequat
						Lorem mollit. Quis ipsum culpa labore anim tempor
						cupidatat consequat irure sit. Nulla pariatur ea tempor
						do amet et magna deserunt amet. Do velit sit consectetur
						cupidatat dolore nostrud tempor deserunt Lorem dolor
						qui. Cupidatat commodo dolor aliquip sunt consequat duis
						minim cillum in non sunt sint nulla. Aute est consequat
						amet laborum consectetur veniam excepteur culpa nostrud.
						Ut dolore culpa elit officia reprehenderit. Culpa
						cupidatat adipisicing ad aute voluptate sunt voluptate
						et labore id occaecat cupidatat ipsum magna. Velit
						officia cupidatat eu incididunt cupidatat adipisicing id
						culpa enim. Nulla sunt culpa minim dolor culpa culpa
						pariatur incididunt proident. Tempor do nulla magna
						excepteur incididunt do. Commodo ea veniam ipsum enim
						enim proident id magna tempor cupidatat reprehenderit
						irure.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;

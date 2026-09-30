import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="container">
      <h1 className="story-title">Our story</h1>

      <p>
        We believe in good. We launched the Fresh Pan Pizza Best Excuse Awards on our
        Facebook fan page. Fans were given situations where they had to come up with wacky
        and fun excuses. The person with the best excuse won the Best Excuse Badge and
        vouchers &mdash; proof that Pizzeria's Fresh Pan Pizza is the tastiest pan pizza ever.
      </p>
      <p>
        Ever since we launched the tastiest pan pizza ever, people have not been able to
        resist the softest, cheesiest, crunchiest, butteriest pizza in town.
      </p>

      <div className="story-grid">
        <img
          className="story-img"
          src="https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500&q=80"
          alt="Fresh pizza ingredients laid out on a table"
        />
        <div>
          <h2>Ingredients</h2>
          <p>
            We're serious about goodness. We have no qualms about tearing up a day-old
            lettuce leaf, straight from the farm, or steaming a baby carrot. Cut. Cut. Chop.
            Chop. Steam. Steam. Stir. Stir. While they're still young and fresh &mdash;
            that's our motto. It makes the kitchen a better place.
          </p>
        </div>
      </div>

      <div className="story-grid reverse">
        <img
          className="story-img"
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80"
          alt="Chef preparing pizza in the kitchen"
        />
        <div>
          <h2>Our Chefs</h2>
          <p>
            They make sauces sing and salads dance. They create magic with skill,
            knowledge, passion, and stirring spoons, among other things. They make
            goodness so good it doesn't know what to do with itself. We do though.
            We send it to you.
          </p>
        </div>
      </div>

      <div className="story-grid">
        <img
          className="story-img small"
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"
          alt="Kitchen timer"
        />
        <div>
          <h2>45 min delivery</h2>
          <p>Hot, fresh pizza at your door in 45 minutes or less &mdash; guaranteed.</p>
        </div>
      </div>
    </div>
  );
}

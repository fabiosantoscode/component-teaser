import React from 'react';
import Teaser from './';

const today = new Date();
export default (
  <Teaser
    image={{
      src: `./assets/teaser.png`,
      title: `Just an image`,
    }}
    flyTitle="The UN, religion and development"
    title="Faith and secular global bodies learn to live together"
    dateTime={today}
    text="THERE are many reasons why sceptics might find fault with the 17
    Sustainable Development Goals, along with 169 associated targets, which
    the leaders of the world (including the pope) will adopt, with some fanfare,
    in New York this week. One problem, as a colleague has written, is that they
    are simply too numerous. As the French statesman Georges Clemenceau
    for a new world order, were enough for the good Lord."
    link={{
      href: `http://www.economist.com/blogs/erasmus/2015/09/un-religion-and-development-0`,
    }}
    itemType="http://schema.org/BlogPosting"
    itemProp="blogPost"
    teaserId={100092}
  />
);

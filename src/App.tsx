import React, { Component, ReactNode } from 'react';
import "@root/styles/general.scss";
import { TimeCard } from './components/TimeCard';
import { getDateInNineDays, timeUntil } from './utilities/timeDifference';
import { timeType } from './components/TimeCard';
import SocialMedia from './components/SocialMedia';

type timeElement = null | TimeCard;

//modify this value es plain text to set a real data
const nextDate = getDateInNineDays(); //"2025-05-23T01:10:51.245Z"
interface social_item {
  href: string,
  alt?: string,
  icon: string,
}
const socials: social_item[] = [
  {
    href: "#",
    icon: "facebook"
  },
  {
    href: "#",
    icon: "pinterest"
  },
  {
    href: "#",
    icon: "instagram"
  }
]
class App extends Component {

  timeCardItems: [timeElement, timeElement, timeElement, timeElement] = [
    null,
    null,
    null,
    null
  ]
  state = {
    preventAnimate: false
  }
  render(): ReactNode {
    const params = timeUntil(nextDate);
    const data = [
      params.days,
      params.hours,
      params.minutes,
      5//params.seconds, //for preview it gots 5s by default, remove comment to do real time 
    ];

    const names = [
      "Days",
      "Hours",
      "Minutes",
      "Seconds"
    ];

    return (
      <>
        <img id="stars" src='./assets/images/bg-stars.svg' width={1440} height={569} alt="stars" />
        <img id="bannerImage" src='./assets/images/pattern-hills.svg' width={1440} height={197} alt="hills pattern" />
        <div className="content">
          <header>
            <h1>
              We're launching soon
            </h1>
          </header>
          <div className='timers'>
            {
              data.map((item, index) => (
                <div className='item' key={index}>
                  <div className='card'>
                    <TimeCard
                      key={index}
                      timetype={index as timeType}
                      initial={item}
                      ref={ref => {
                        this.timeCardItems[index] = ref;
                      }}
                      preventAnimate={data[0] == 0 && this.state.preventAnimate}

                      onUpdate={async () => {
                        //prevent trigger onupdate in days component
                        const prev = index > 0;
                        if (!prev) {
                          return;
                        }

                        const newIndex = index - 1;

                        //only trigger to exists component
                        const prevItem = this.timeCardItems[newIndex];
                        if (!prevItem) {
                          return;
                        }

                        if (newIndex == 0 && prevItem.state.time == 0) {
                          this.setState({
                            preventAnimate: true,
                          })
                        } else {

                          await prevItem.substract();
                        }

                      }}
                    />
                  </div>
                  <div className="name">
                    {names[index]}
                  </div>
                </div>
              ))
            }
          </div>
          <footer>
            {
              socials.map((item, index) => (
                <SocialMedia {...item}  key={index}/>
              ))
            }
          </footer>
          {/* <TimeCard />
          <TimeCard timetype={0} /> */}
        </div>
      </>
    )
  }
}


export default App;

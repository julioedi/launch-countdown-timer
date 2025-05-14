import React, { Component, ReactNode} from 'react';
import "@root/styles/general.scss";
import { wait } from '@root/utilities/wait';
import { randomIDMultiple } from '@root/utilities/randomID';

/**
 * 0 = days
 * 1 = hours
 * 2 = minutes
 * 3 = seconds
 */
export type timeType = 0 | 1 | 2 | 3;
interface TimerCardProps {
    onUpdate?: () => void,
    is_Segs?: boolean,
    initial: number,
    timetype?: timeType,
    preventAnimate?: boolean,
}

class TimeCard extends Component<TimerCardProps> {
    state = {
        time: this.props.initial,
    }
    maxNums = [
        8,
        23,
        59,
        59
    ]
    max: number = this.props.timetype ?? 3;
    interval: null | any = null;
    itemId = randomIDMultiple();

    animate = async (item: null | HTMLElement) => {
        item?.querySelector(".top.current")?.classList.remove("active");
        await wait(0.25);
        item?.querySelector(".bottom.next")?.classList.add("active");
        item?.querySelector(".bottom.current")?.classList.add("overlay");
        await wait(0.25);
    }
    lasttime: number = 999;
    substract = async () => {
        if (this.props.preventAnimate) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            return 0;
        }
        const update = this.state.time === 0;
        const newData = {
            time: update ? this.maxNums[this.max] + 0 : this.state.time - 1
        }
        const item = document.getElementById(this.itemId);
        if (update && this.props.onUpdate) {
            this.props.onUpdate();
        }
        await this.animate(item);
        this.setState(newData);
        return newData.time;
    }


    componentDidMount(): void {
        if (this.props.timetype == 3 && !this.props.preventAnimate) {
            this.interval = setInterval(this.substract, 1000);
        }
    }
    componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    item: null | HTMLDivElement = null;

    formated = (is_prev: boolean = false) => {
        if (this.props.preventAnimate) {
            return "00";
        }
        const { time } = this.state;
        let pre = time;
        if (is_prev) {
            pre = time === 0 ? this.maxNums[this.max] : time - 1;
        }
        return pre < 10 ? "0" + pre : pre;
    }
    render(): ReactNode {
        const { formated } = this;
        const { time } = this.state;
        const key = randomIDMultiple();
        return (
            <div className='card_item' id={this.itemId} key={key}>
                <div className='element top next'>
                    <span>{formated(true)}</span>
                </div>
                <div className={`element top current active`}>
                    <span>{formated()}</span>
                </div>
                <div className='element bottom current'>
                    <span>{formated()}</span>
                </div>
                <div className={`element bottom next`}>
                    <span>{formated(true)}</span>
                </div>
            </div>
        )
    }
}

export { TimeCard }
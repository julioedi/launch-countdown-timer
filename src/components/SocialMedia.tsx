import React, { AnchorHTMLAttributes, Component, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

interface SocialMediaItemProps extends AnchorHTMLAttributes<HTMLAnchorElement>{
    icon: string,
}
export default class extends Component<SocialMediaItemProps> {
    render(): ReactNode {
        const { icon, children, ...props } = this.props;
        return (
            <a
                {...props as any}
            >
                <span className="social_icon" style={{
                    maskImage:`url("./assets/images/icon-${icon}.svg")`,
                }}/>
            </a>
        )
    }
}
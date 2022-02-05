import React, { Fragment } from "react";
import { Route } from "react-router";

function LayoutAuthIntro(props) {
  return <Fragment>{props.children}</Fragment>;
}

export default function AuthIntroTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <LayoutAuthIntro>
          <Component {...propsComponent} />
        </LayoutAuthIntro>
      )}
    />
  );
}

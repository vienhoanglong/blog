import { Button } from "components/button"
import React from "react"
import styled from "styled-components"
const HomeBannerStyles = styled.div`
  height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-content{
      max-width: 600px;
      color: white;
    }
    &-heading{
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc{
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
`
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Monkey Blogging</h1>
            <p className="banner-desc">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <Button to="/sign-up">Get started</Button>
          </div>
          <div className="banner-image">
            <img src="/banner.png" alt="banner" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  )
}

export default HomeBanner
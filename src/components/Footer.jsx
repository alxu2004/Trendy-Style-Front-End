import React from 'react'
import styled from 'styled-components'
import faceBookWhite from '../assets/facebook-white.svg'
import twitterWhite from '../assets/twitter-white.svg'
import instagramWhite from '../assets/instagram-white.svg'
import { Link } from 'react-router-dom'

const FooterStyle = styled.footer`
  background-color: #171717;
  color: #b5b5b5;
  font-family: sans-serif;
  font-size: 10px;
  min-height: 15px;
  display: flex;
  flex-direction: column;
  padding-inline: 20%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
`
const UlFooter = styled.ul`
  display: flex;
  position: relative;
  margin-top: 30px;
  list-style: none;
  text-decoration: none;
  text-align: center;
`
const LiFooter = styled.li`
  text-decoration: none;
  margin-right: 10px;
  text-align: center;
  position: relative;
  &:not(:last-child)::after {
    content: '';
    position: relative;
    top: 50%;
    right: 0;
    height: 50%;
    border-right: 1px solid #333;
  }
`
const PFooter = styled.p`
  display: flex;
  position: relative;
  text-align: center;
`
const SocialFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

const ImgFooterF = styled.img`
  width: 15px;
  height: 15pxs;
  margin: 10px;
`
const ImgFooterT = styled.img`
  width: 26px;
  height: 26px;
  margin: 10px;
`
const ImgFooterI = styled.img`
  width: 25px;
  height: 25pxs;
  margin: 10px;
`
const DivFooterRed = styled.div`
  position: relative;
  margin-top: 34px;
`
const DivFooterApp = styled.div`
  position: relative;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

export const Footer = () => {
  return (
    <FooterStyle>
      <UlFooter>
        <LiFooter>
          <StyledLink style={{textDecoration:'none',listStyle:'none', color:'white'}} to='/'>Home</StyledLink>
        </LiFooter>
        <LiFooter>Terms and conditions</LiFooter>
        <LiFooter>Privacy PoLicy</LiFooter>
        <LiFooter>Collection Statement</LiFooter>
        <LiFooter>Help</LiFooter>
        <LiFooter>Manage Account</LiFooter>
      </UlFooter>
      <PFooter>Copyright © 2016 DEMO Streaming. All Right Reserved.</PFooter>
      <SocialFooter>
        <DivFooterRed>
          <ImgFooterF src={faceBookWhite} alt='' />
          <ImgFooterT src={twitterWhite} alt='' />
          <ImgFooterI src={instagramWhite} alt='' />
        </DivFooterRed>
        <DivFooterApp></DivFooterApp>
      </SocialFooter>
    </FooterStyle>
  )
}

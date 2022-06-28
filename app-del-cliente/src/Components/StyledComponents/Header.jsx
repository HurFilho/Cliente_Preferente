import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div.attrs(() => ({
    className: 'row',
}))`
background: #264653;
color: "#FFF";
padding: 3em 0 1em 2em;
height: 6em;
`

export const HeaderLeftText = styled.h2`
align-self: self-end;
color: white;
`

export const HeaderCenterText = styled.h2`
text-align: center;
color: white;
`
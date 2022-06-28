import styled, { css } from 'styled-components'

export const Button = styled.button.attrs(() => ({
    className: 'btn',
}))`
font-size: 1.6em;
border-radius: 3px;
height: 4em;
max-width: 630px;
width: 96%;
font-weight: 500;
border: 1px solid transparent;
margin-top: .4em;
&:hover {
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
}
`

export const PrimaryButton = styled(Button).attrs(() => ({
    className: 'btn-primary',
}))``

export const SecondaryButton = styled(Button).attrs(() => ({
    className: 'btn-secondary',
}))``

export const SuccessButton = styled(Button).attrs(() => ({
    className: 'btn-success',
}))``

export const DangerButton = styled(Button).attrs(() => ({
    className: 'btn-danger',
}))``

export const WarningButton = styled(Button).attrs(() => ({
    className: 'btn-warning',
}))``

export const InfoButton = styled(Button).attrs(() => ({
    className: 'btn-info',
}))``

export const LightButton = styled(Button).attrs(() => ({
    className: 'btn-light',
}))``

export const DarkButton = styled(Button).attrs(() => ({
    className: 'btn-dark',
}))``

export const LinkButton = styled(Button).attrs(() => ({
    className: 'btn-link',
}))``

export const AsignarButton = styled(Button).attrs(() => ({
    className: 'btn-primary',
}))`
color: white;
background: #5a8ea3;
&:hover{
    background: #66A0B7;
    border: 1px solid transparent;
}`

export const LeerCuponButton = styled(Button).attrs(() => ({
    className: 'btn-secondary',
}))`
color: white;
background: #1f8c7f;
&:hover{
    background: #2A9D8F;
    border: 1px solid transparent;
}`
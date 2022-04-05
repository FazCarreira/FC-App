import styled from "@emotion/styled";

const Container = styled.div(({ theme }) => ({
    display: 'flex',
    alignItems: 'center'
}))
const Border = styled.div(({ theme }) => ({
    borderBottom: "2px solid lightgray",
    width: "100%"
}))
const Content = styled.div(({ theme }) => ({
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 500,
    fontSize: 22,
    color: "darkgray"
}))

const TextDivider = ({ children }) => (
    <Container>
        <Border />
        <Content>{children}</Content>
        <Border />
    </Container>
)

export default TextDivider;
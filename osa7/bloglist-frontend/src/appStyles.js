import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
  background: #fbffd1;
  min-height: 100vh;
  font-family: Courier, monospace;
  text-transform: lowercase;
  letter-spacing: 0.05em;
  color: black;
`
export const Container = styled.div`
  padding: 2rem 1rem;
  @media (min-width: 768px) {
    padding: 3rem 6rem;
  }
`
export const Navigation = styled.div`
  background: rgba(255, 235, 253, 0.8);
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  @media (min-width: 768px) {
    gap: 2rem;
    grid-template-columns: 1fr max-content max-content;
    align-items: center;
  }
`
export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`
export const NavItem = styled(Link)`
  color: black;
`

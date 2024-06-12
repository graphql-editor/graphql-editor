import React from "react";
import styled from "@emotion/styled";
import * as vars from "@/vars";
import { Plus, Search } from "@aexol-studio/styling-system";

interface MenuSearchProps {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  placeholder?: string;
  icon?: "search" | "add";
}

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
`;

const Main = styled.input`
  background-color: ${({ theme }) => theme.neutrals.L7};
  border-radius: ${(p) => p.theme.border.primary.radius};
  color: ${({ theme }) => theme.text.default};
  width: 100%;
  min-width: 0;
  height: 36px;
  padding: 0 2.5rem 0 0.5rem;
  font-size: 14px;
  outline: 0;
  position: relative;
  border-color: ${(p) => p.theme.neutrals.L2};
  border-width: 1px;
  border-style: solid;
  transition: ${vars.transition};
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
  :focus {
    border-color: ${({ theme }) => theme.accent.L2};
  }
`;

const IconContainerStyle = styled.span`
  position: absolute;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  right: 0.5rem;
`;

const SearchIconContainer = styled(IconContainerStyle)`
  margin-left: 15px;
  color: ${({ theme }) => theme.text.disabled};
`;

export const SearchInput = React.forwardRef<HTMLInputElement, MenuSearchProps>(
  (
    { value, onChange, onSubmit, placeholder = "Search...", icon = "search" },
    ref
  ) => {
    return (
      <Wrapper>
        <Main
          ref={ref}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <SearchIconContainer>
          {icon === "search" && <Search />}
          {icon === "add" && <Plus />}
        </SearchIconContainer>
      </Wrapper>
    );
  }
);

SearchInput.displayName = "SearchInput";

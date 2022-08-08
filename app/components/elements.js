import styled from "styled-components/native";
import Colors from "../constants/Colors";

// BACKGROUND
export const Background = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
`;

export const ModalBackground = styled.View`
  flex: 1;
  background-color: ${Colors.TextOnPrimary};
`;

export const ScrollBackground = styled.View`
  flex: 1;
  background-color: ${Colors.Background};
  padding-bottom: 15;
`;

// TEXT
export const Text = styled.Text`
  color: ${Colors.Text};
`;

export const TitleText = styled(Text)`
  font-size: 18px;
`;

export const CenteredText = styled(Text)`
  text-align: center;
`;

export const LightText = styled.Text`
  color: ${Colors.LightText};
`;

export const ErrorText = styled.Text`
  color: ${Colors.Error};
`;

export const SectionHeaderText = styled.Text`
  text-align: center;
  padding-top: 15;
  padding-bottom: 5;
  color: ${Colors.LightText};
  background-color: ${Colors.Background};
`;

export const HighlightedText = styled.Text`
  color: ${Colors.Secondary};
`;

export const CardTitleText = styled.Text`
  font-weight: bold;
  text-align: left;
  margin-top: 20px;
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
  color: ${Colors.Text};
`;

// ITEM
export const Item = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-color: ${Colors.Border};
  background-color: white;
`;

export const ItemTitle = styled.View`
  flex: 1;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

// CARD
export const Card = styled(Item)`
  border-top-width: 1px;
  padding: 10px;
  box-shadow: 0 0 1px ${Colors.Border};
`;

// Row
export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 50px;
  border-bottom-width: 1;
  border-color: ${Colors.Border};
  background-color: white;
`;

// Button
export const GreyButton = styled.View`
  background-color: ${Colors.Background};
  height: 32px;
  border-radius: 8px;
`;

export const GreyButtonText = styled.Text`
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  color: ${Colors.Primary};
`;

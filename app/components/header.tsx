import { Card, Grid, Heading, Icon, Text, useTheme, View, ToggleButton, ToggleButtonGroup, ColorMode } from '@aws-amplify/ui-react';
import { useContext, useState } from 'react';
import { ColorModeContext } from '../dark_mode';

const DashboardHeader = () => {
    const { tokens } = useTheme();
    const [showInfo, setShowInfo] = useState(false);
    const { colorMode, setColorMode } = useContext(ColorModeContext);

    return (
        <>
            <Card
                as="nav"
                variation="elevated">
                <Grid
                    columnGap="0.5rem"
                    rowGap="0.5rem"
                    templateColumns="1fr auto"
                    padding={tokens.space.small}
                >
                    <View display="inline-flex">
                        <View display="inline-flex" style={{ alignItems: 'center' }}>
                            <Heading level={3}>
                                Example Charts
                            </Heading>

                            <Icon
                                marginLeft={tokens.space.medium}
                                ariaLabel="Info"
                                width={24}
                                height={24}
                                viewBox={{ width: 24, height: 24 }}
                                pathData={"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"}
                                fill={tokens.colors.font.info.toString()}
                                onClick={() => setShowInfo(!showInfo)}
                                onMouseEnter={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                            />
                            <View
                                display={showInfo ? "" : "none"}
                                marginLeft={tokens.space.small}
                            >
                                <Text color={tokens.colors.font.info}>
                                    This dashboard uses generated data for demonstration purposes only.
                                    It serves as an example of what an API dashboard could look like with real data.
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <ToggleButtonGroup
                            value={colorMode}
                            isExclusive
                            onChange={(value) => setColorMode(value as ColorMode)}
                            size="large"
                            minHeight={44}
                        >
                            {/*Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
                            <ToggleButton
                                value="light"
                                ariaLabel="light mode">
                                <svg
                                    height={20}
                                    fill={tokens.colors.background.quaternary.toString()}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
                                </svg>
                            </ToggleButton>
                            <ToggleButton
                                defaultPressed
                                value="dark"
                                ariaLabel="dark mode">
                                <svg
                                    height={20}
                                    fill={tokens.colors.background.quaternary.toString()}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512">
                                    <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                                </svg>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </View>
                </Grid>
            </Card>
        </>
    );
};

export default DashboardHeader;

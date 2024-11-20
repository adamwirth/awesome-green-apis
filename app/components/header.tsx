import { Card, Grid, Heading, Icon, useTheme, View, ToggleButton, ToggleButtonGroup, ColorMode, Message } from '@aws-amplify/ui-react';
import { useContext, useState } from 'react';

import { ColorModeContext } from '../dark_mode';
import { SunIcon, MoonIcon, GithubIcon } from './icons';

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
                    gap={tokens.space.xs}
                    templateColumns={{ base: "1fr auto", medium: "2fr 1fr" }}
                    padding={tokens.space.small}
                >
                    <View display="inline-flex">
                        <View display="inline-flex" style={{ alignItems: 'center', position: 'relative' }}>
                            <Heading
                                level={3}
                                fontSize={tokens.fontSizes.xxl}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
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
                                onClick={() => setShowInfo(true)}
                                onMouseEnter={() => setShowInfo(true)}
                                onMouseLeave={() => setShowInfo(false)}
                                style={{ cursor: "pointer" }}
                            />
                            <Message
                                className="info-message"
                                marginLeft="1rem"
                                heading="Note"
                                role="note"
                                variation="outlined"
                                colorTheme="info"
                                position="absolute"
                                left="100%"
                                top="0"
                                width="400px"
                                hasIcon={false}
                                style={{
                                    opacity: showInfo ? 1 : 0,
                                    visibility: showInfo ? 'visible' : 'hidden',
                                    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
                                    zIndex: 100
                                }}
                            >
                                This dashboard uses generated data for demonstration purposes only.
                                It serves as an example of what an API dashboard could look like with real data.
                            </Message>
                        </View>
                    </View>

                    <View
                        aria-hidden="true"
                        display="flex"
                        style={{
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '0.5rem'
                        }}
                    >
                        <ToggleButtonGroup
                            value={colorMode}
                            isExclusive
                            onChange={(value) => setColorMode(value as ColorMode)}
                            size="large"
                            minHeight={44}
                        >
                            <ToggleButton
                                value="light"
                                ariaLabel="light mode">
                                <SunIcon fill={tokens.colors.background.quaternary.toString()} />
                            </ToggleButton>
                            <ToggleButton
                                defaultPressed
                                value="dark"
                                ariaLabel="dark mode">
                                <MoonIcon fill={tokens.colors.background.quaternary.toString()} />
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <a
                            href="https://github.com/adamowirth/awesome-green-apis"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '0.5rem'
                            }}
                        >
                            <GithubIcon fill={tokens.colors.background.quaternary.toString()} />
                        </a>
                    </View>
                </Grid>
            </Card>
        </>
    );
};

export default DashboardHeader;

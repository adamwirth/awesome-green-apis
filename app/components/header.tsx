import * as React from 'react';
import { Card, Grid, View, Text, Heading, Icon, useTheme } from '@aws-amplify/ui-react';
import { useState } from 'react';

const DashboardHeader = () => {
    const { tokens } = useTheme();
    const [showInfo, setShowInfo] = useState(false);

    return (
        <Card>
            <Grid>
                <View display="inline-flex">
                    <Heading level={4}>
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
            </Grid>
        </Card>
    );
};

export default DashboardHeader;
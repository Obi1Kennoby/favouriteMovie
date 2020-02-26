import * as React from 'react'
import { View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import styles from '../styles'
import { Movie } from '../../../state'

interface Props {
  cells: string[]
  textStyle?: StyleProp<ViewStyle>
}

class ListItem extends React.PureComponent<Props> {
  cellStyle = null
  constructor(props) {
    super(props)
    this.cellStyle = StyleSheet.flatten({
      width: 100 / props.cells.length + '%',
    })
  }

  render() {
    const { cells, textStyle } = this.props
    return (
      <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
        {cells.map((item, index) => (
          <View key={index} style={this.cellStyle}>
            <Text style={[styles.text, textStyle]}>{item}</Text>
          </View>
        ))}
      </View>
    )
  }
}

export default ListItem

import { StyleSheet, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import { Table, Row } from 'react-native-table-component';

export const CashFlow = () => {
  const tableData = [
    ['Venue', '15/01/2024', 'IDR 400,000,000'],
    ['Attire', '15/01/2024', 'IDR 40,000,000'],
  ];

  const transformedData = tableData.map((rowData, rowIndex) => {
    return (
      <Row
        key={rowIndex}
        data={rowData.map((cellData, colIndex) => {
          switch (colIndex) {
            case 0:
              return <Text style={[styles.cellText, styles.categoryColumn]}>{cellData}</Text>;
            case 1:
              return <Text style={[styles.cellText, styles.dateColumn]}>{cellData}</Text>;
            case 2:
              return <Text style={[styles.cellText, styles.spendingColumn]}>{cellData}</Text>;
            default:
              return <Text style={styles.cellText}>{cellData}</Text>;
          }
        })}
        style={styles.row}
        flexArr={[1, 2, 2]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1, borderColor: MyTheme.colors.white }}>
        <Row
          data={['Category', 'Date', 'Spending']}
          style={styles.head}
          textStyle={{ color: MyTheme.colors.neutral_2p, textAlign: 'center', ...MyTheme.typography.medium.medium_1 }}
          flexArr={[1, 2, 2]}
        />
        <ScrollView>
          {transformedData}
        </ScrollView>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { 
      flex: 1,  
      marginTop: 30, 
      marginLeft: 29,
      marginRight: 29,
      backgroundColor: '#fff' 
    },
    head: { 
      height: 40,
      marginBottom: 8,
    },
    cellText: {
      textAlign: 'center',
      paddingVertical: 20,
    },
    categoryColumn: {
      textAlign: 'center',
    },
    dateColumn: {
      textAlign: 'center',
      color: MyTheme.colors.neutral_2p,
    },
    spendingColumn: {
      textAlign: 'center',
      color: MyTheme.colors.peach_2,
    },
    row: {
      borderBottomWidth: 0.2,
      borderColor: MyTheme.colors.neutral_4, 
    }
});

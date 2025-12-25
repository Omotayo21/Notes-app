import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from './ThemeProvider';

export default function TagPills({ tags, input, onInputChange, editable = true, onAdd, onRemove, style }) {
  const { theme } = useTheme();
  const addTag = () => {
    let tag = input.trim();
    if (tag && !tags.includes(tag)) {
      onAdd && onAdd(tag);
    }
    onInputChange && onInputChange('');
  };
  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 12 }, style]}>
      {tags.map((t) => (
        <View key={t} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8, backgroundColor: theme.pill, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3, marginTop: 4 }}>
          <Text style={{ color: theme.accent, fontWeight: 'bold' }}>{t}</Text>
          {editable && (
            <TouchableOpacity onPress={() => onRemove && onRemove(t)}>
              <Text style={{ color: theme.text, marginLeft: 3 }}>×</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      {editable && (
        <TextInput
          value={input}
          onChangeText={onInputChange}
          placeholder="Add tag..."
          style={{ minWidth: 70, padding: 4, fontSize: 14, color: theme.text, borderBottomWidth: 1, borderColor: theme.pill }}
          onSubmitEditing={addTag}
          blurOnSubmit={false}
          returnKeyType="done"
        />
      )}
    </View>
  );
}

import { useController } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

type Props = {
  name: string;
  control: any;
} & TextInputProps;

const MyInput = ({ name, control, ...props }: Props) => {
  const {
    fieldState: { error },
    field: { value, onChange, onBlur },
  } = useController({ name, control });

  return (
    <View>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        className="border border-gray-300 rounded-2xl p-4 bg-white"
      />
      {error && <Text className="text-red-500">{error.message}</Text>}
    </View>
  );
};

export default MyInput;

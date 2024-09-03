<template>
  <q-page>
    <q-dialog v-model="localErrorMessage">
      <q-card>
        <q-card-section>
          <h6>{{ props.errorMessage }}</h6>
        </q-card-section>
        <q-card-actions>
          <q-btn color="red" label="Ok" @click="close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">

const props = defineProps<{
    showErrorDialog: boolean;
    errorMessage: string;
}>();

const emit = defineEmits<(e: 'close') => void>();

const localErrorMessage = props.showErrorDialog;
function close(){
    emit('close');
}
</script>
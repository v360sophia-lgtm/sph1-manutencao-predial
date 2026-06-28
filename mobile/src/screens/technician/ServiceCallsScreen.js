import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { useServiceCallStore } from '../../store/serviceCallStore';

export default function ServiceCallsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('pending');
  const { serviceCalls, setServiceCalls } = useServiceCallStore();

  useEffect(() => {
    loadServiceCalls();
  }, [statusFilter]);

  const loadServiceCalls = async () => {
    try {
      setLoading(true);
      const response = await api.getServiceCalls({ status: statusFilter });
      setServiceCalls(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar chamados');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadServiceCalls();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      in_progress: '#3B82F6',
      completed: '#10B981',
      cancelled: '#EF4444',
    };
    return colors[status] || '#999';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendente',
      in_progress: 'Em Progresso',
      completed: 'Concluído',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  const renderServiceCall = ({ item }) => (
    <TouchableOpacity
      style={styles.callCard}
      onPress={() => navigation.navigate('ServiceCallDetail', { callId: item.id })}
    >
      <View style={styles.callHeader}>
        <View style={styles.callInfo}>
          <Text style={styles.callId}>#{item.id}</Text>
          <Text style={styles.callTitle}>{item.title}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>
      <Text style={styles.callDescription}>{item.description}</Text>
      <View style={styles.callFooter}>
        <Text style={styles.callDate}>
          {new Date(item.created_at).toLocaleDateString('pt-BR')}
        </Text>
        <MaterialIcons name="chevron-right" size={24} color="#2563EB" />
      </View>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'pending' && styles.filterButtonActive,
          ]}
          onPress={() => setStatusFilter('pending')}
        >
          <Text
            style={[
              styles.filterButtonText,
              statusFilter === 'pending' && styles.filterButtonTextActive,
            ]}
          >
            Pendentes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'in_progress' && styles.filterButtonActive,
          ]}
          onPress={() => setStatusFilter('in_progress')}
        >
          <Text
            style={[
              styles.filterButtonText,
              statusFilter === 'in_progress' && styles.filterButtonTextActive,
            ]}
          >
            Em Progresso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            statusFilter === 'completed' && styles.filterButtonActive,
          ]}
          onPress={() => setStatusFilter('completed')}
        >
          <Text
            style={[
              styles.filterButtonText,
              statusFilter === 'completed' && styles.filterButtonTextActive,
            ]}
          >
            Concluídos
          </Text>
        </TouchableOpacity>
      </View>

      {serviceCalls.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum chamado encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={serviceCalls}
          renderItem={renderServiceCall}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 12,
  },
  callCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  callInfo: {
    flex: 1,
  },
  callId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  callTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  callDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  callFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});

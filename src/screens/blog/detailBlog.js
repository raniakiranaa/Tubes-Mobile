import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { db } from '../../firebase'; // Pastikan Firestore diinisialisasi dengan benar
import { doc, getDoc } from 'firebase/firestore';
import MyTheme from '../../config/theme';

const DetailBlog = ({ route }) => {
  const { id } = route.params;
  const blogID = `${id}`;
  const [blog, setBlog] = useState(null);
  const [vendorName, setVendorName] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blog', blogID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const blogData = docSnap.data();
          setBlog(blogData);
          // console.log(blogData);
          // Mengubah timestamp created_at menjadi objek Date
          const createdDate = new Date(blogData.created_at.seconds * 1000);
          
          // Mengambil tanggal dalam format yang diinginkan
          const options = { month: 'long', day: 'numeric', year: 'numeric' };
          const formattedDate = createdDate.toLocaleDateString('en-US', options);
      
          setCreatedDate(formattedDate);

          // Mengambil vendorName berdasarkan vendorID
          if (blogData.vendorID) {
            const vendorRef = blogData.vendorID; // Menggunakan referensi langsung
            const vendorSnap = await getDoc(vendorRef);

            if (vendorSnap.exists()) {
              const vendorData = vendorSnap.data();
              setVendorName(vendorData.name);
              // console.log(vendorName);
            } else {
              console.log('No such vendor document!');
            }
          }
        } else {
          console.log('No such blog document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={MyTheme.colors.neutral_2p} />
          </View>
    );
  }

  if (!blog) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Blog not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.blogImageContainer}>
        <Image
          source={{uri: blog.blog_img}}
          style={styles.blogImage}
          resizeMode="cover"
        />
      </View>
      <Text style={[styles.title, MyTheme.typography.subtitle.sub_2]}>{blog.title}</Text>
      <Text style={[styles.description, MyTheme.typography.subtitle.sub_3]}>{blog.description}</Text>
      <Text style={[styles.vendorName, MyTheme.typography.body.body_2]}>{createdDate}  -  {vendorName}</Text>
      {renderMarkdownContent(blog.content)}
    </ScrollView>
  );
};

const renderMarkdownContent = (content) => {
  const paragraphs = content.split("\\n\\n"); // Memisahkan konten berdasarkan dua baris baru
  // console.log(paragraphs)
  return paragraphs.map((paragraph, index) => {
    const lines = paragraph.split('\\n'); // Memisahkan setiap paragraf berdasarkan satu baris baru
    return (
      <View key={index} style={styles.paragraphContainer}>
        {lines.map((line, lineIndex) => {
          if (line.startsWith(' ###')) {
            return <Text key={lineIndex} style={[styles.subHeader, MyTheme.typography.subtitle.sub_2]}>{line.replace('### ', '')}</Text>;
          } else if (line.startsWith(' ##')) {
            return <Text key={lineIndex} style={[styles.header, MyTheme.typography.medium.medium_1]}>{line.replace('## ', '')}</Text>;
          } else if (line.startsWith(' #')) {
            return <Text key={lineIndex} style={[styles.mainHeader, MyTheme.typography.subtitle.sub_2]}>{line.replace('# ', '')}</Text>;
          } else {
            return <Text key={lineIndex} style={[styles.paragraph, MyTheme.typography.body.body_2]}>{line.replace(' ', '')}</Text>;
          }
        })}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    // marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  blogImageContainer: {
    width: '100%',
    height: 160, // Atur tinggi gambar sesuai kebutuhan
    marginTop: 10,
    marginBottom: 16,
  },
  blogImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  title: {
    marginBottom: 2,
  },
  description: {
    fontSize: 18,
    marginBottom: 2,
    color: MyTheme.colors.brown_2,
  },
  vendorName: {
    marginBottom: 20, // Tambahkan gaya untuk vendorName
    color: MyTheme.colors.neutral_2p,
  },
  mainHeader: {
    marginBottom: 1,
    marginTop: 1,
    width: '100%',
    color: MyTheme.colors.peach_2,
  },
  header: {
    marginBottom: 4,
    marginTop: 4,
    width: '100%',
    textAlign: 'justify',
    color: MyTheme.colors.brown_2,
  },
  subHeader: {
    marginBottom: 8,
    marginTop: 10,
    width: '100%',
    textAlign: 'justify',
    color: MyTheme.colors.peach_2,
  },
  paragraph: {
    marginBottom: 8,
    width: '100%',
    textAlign: 'justify',
  },
  paragraphContainer: {
    marginBottom: 6, // Memberikan margin bawah antar paragraf
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  
});

export default DetailBlog;
